import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import { showNotification as show, checkWin } from "./helpers/helpers";

import data from "./newData";

import "./App.css";

// const data = [
//   "application",
//   "programming",
//   "interface",
//   "wizard",
//   "representative",
//   "responsible",
//   "servant",
//   "suggestion",
//   "thought",
//   "through",
//   "verse",
//   "violent",
// ];
let selectedWord = data[Math.floor(Math.random() * data.length)];
const splitedWord = selectedWord.split("");
const randomLetter = Math.floor(Math.random() * splitedWord.length);

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([
    splitedWord[randomLetter],
  ]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    const random = Math.floor(Math.random() * data.length);

    const word = data[random];
    const splitedWord = word.split("");
    const randomLetter = Math.floor(Math.random() * splitedWord.length);

    // Empty Arrays
    setCorrectLetters([splitedWord[randomLetter]]);
    setWrongLetters([]);
    selectedWord = data[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
