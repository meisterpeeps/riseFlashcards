import React, { useState } from "react";
import { ReactComponent as ReactFlip } from "../flip.svg";
import "../index.css";

export function Flashcard({
  flipped,
  cardNumber,
  flipCard,
  flashcardData,
  initialRender,
}) {
  const [scrollGradient, setScrollGradient] = useState(true);

  const removeGradient = (e) => {
    const scrollDiv = e.target;
    if (
      scrollDiv.scrollTop + 1 >=
      scrollDiv.scrollHeight - scrollDiv.offsetHeight
    ) {
      setScrollGradient(false);
    } else setScrollGradient(true);
  };

  const displayBackContent = () => {
    if (flashcardData.back.type === "text") {
      return (
        <div className="flashcard-content">
          <div
            className="flashcard-center"
            aria-label="Flashcard back - Back of card 1"
          >
            <div
              aria-hidden={flipped[1] ? "false" : "true"}
              className="flashcard-description brand-font"
            >
              <div className="flashcard-text">{flashcardData.back.content}</div>
            </div>
          </div>
        </div>
      );
    } else if (flashcardData.back.type === "scroll") {
      return (
        <div className="flashcard-content">
          <div
            className={
              scrollGradient
                ? "flashcard-center flashcard-center-scroll flashcard-center-overflow"
                : "flashcard-center flashcard-center-scroll"
            }
            aria-label="Flashcard back - Café au lait crema so cup est single shot acerbic. Saucer as, black crema organic single origin mocha. Half and half as iced caffeine robusta wings instant. Caramelization brewed con panna, aftertaste, seasonal, froth and, a medium ristretto caramelization caffeine. Mocha crema, lungo, bar, roast in coffee that latte as grinder latte. Cortado, acerbic, grounds coffee doppio brewed sweet. Id, plunger pot single shot, filter, galão spoon blue mountain aged beans. As whipped et chicory aftertaste java robusta est half and half."
            onScroll={removeGradient}
          >
            <div
              aria-hidden={flipped[1] ? "false" : "true"}
              className="flashcard-description brand-font"
            >
              <div className="flashcard-scroll">
                {flashcardData.back.content}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (flashcardData.back.type === "image") {
      return (
        <div
          className="flashcard-content flashcard-image"
          style={{ backgroundImage: `url(${flashcardData.back.content})` }}
        >
          <div className="flashcard-center" aria-label="Flashcard back" />
        </div>
      );
    }
  };

  return (
    <div
      className={
        flipped
          ? "flashcard flashcard-small flashcard-flipped"
          : "flashcard flashcard-small"
      }
      onClick={() => flipCard(cardNumber)}
    >
      <div
        aria-hidden={flipped ? "true" : "false"}
        className="flashcard flashcard-front"
        role="button"
      >
        <div className="flashcard-content brand-border">
          <div
            className="flashcard-center"
            aria-label="Flashcard front - Front of card 1"
          >
            <div
              aria-hidden={flipped ? "true" : "false"}
              className="flashcard-description brand-font"
            >
              <div className="flashcard-text">
                {flashcardData.front.content}
              </div>
            </div>
          </div>
        </div>
        <button className="flashcard-flip brand-font">
          <span className="flip-text brand-font">
            {cardNumber === 1 && initialRender ? "Click to flip" : null}
          </span>
          <span className="flip-icon brand-font">
            <ReactFlip className="flip-svg" />
          </span>
        </button>
      </div>
      <div
        aria-hidden={flipped[1] ? "false" : "true"}
        className={
          flashcardData.back.type === "image"
            ? "flashcard flashcard-back flashcard-background-image"
            : "flashcard flashcard-back"
        }
        role="button"
      >
        {displayBackContent()}
        <button className="flashcard-flip brand-font">
          <span className="flip-text brand-font"></span>
          <span className="flip-icon brand-font">
            <ReactFlip className="flip-svg" />
          </span>
        </button>
      </div>
    </div>
  );
}
