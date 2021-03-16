import React, { useState, useEffect } from "react";
import "../index.css";
import { Flashcard } from "./Flashcard.js";

//Bugs(?) on Rise demos.
// Flip svg icons not always changing colors on hover

export function Flashcards() {
  const [flipped, setFlipped] = useState({});
  const [fetchedInitialState, setFetchedInitialState] = useState(false);
  const [flashcardData, setFlashcardData] = useState([]);

  useEffect(() => {
    fetch("/flashcard-blocks")
      .then((response) => response.json())
      .then((result) => {
        setFlashcardData(result.flashcardBlocks[0].cards);
        // persistent state
        setFlipped(result.flashcardFlippedState);

        // do not render until initialstate is fetched and do not post user state until after first render
        setFetchedInitialState(true);
      });
  }, []);

  useEffect(() => {
    const postState = () => {
      fetch("/flashcard-flipped-state", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flipped),
      }).then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        } else console.log("status", response.status);
      });
    };
	
    if (fetchedInitialState) {
      postState();
    }
  }, [flipped, fetchedInitialState]);

  // flip the card(by number)
  const flipCard = (num) => {
    // clickToFlip is variable that determines whether "click to flip" message displays on card 1
    setFlipped({ ...flipped, [num]: !flipped[num], clickToFlip: false });
  };

  if (!fetchedInitialState) {
    return null;
  }
  return (
    <div className="flashcards-wrapper">
      {flashcardData.map((cardData, index) => {
        return (
          <Flashcard
            flashcardData={cardData}
            flipped={flipped[index + 1]}
            initialRender={flipped["clickToFlip"]}
            cardNumber={index + 1}
            flipCard={flipCard}
          ></Flashcard>
        );
      })}
    </div>
  );
}
