import React from "react";
import ReactDOM from "react-dom";
import { Flashcards } from "./blocks/Flashcards";
import "./index.css";

function App() {
	return <Flashcards />;
}

ReactDOM.render(<App />, document.getElementById("root"));
