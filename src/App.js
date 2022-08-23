import React, { useEffect, useState } from "react";
import { imagesArray } from "./imagesData";
import "./App.css";
import SingleCard from "./SingleCard";

const App = () => {
  const [cardData, setCardData] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (choiceTwo) {
      if (choiceOne.url === choiceTwo.url) {
        console.log("check data now");
        setCardData((prev) =>
          prev.map((item) =>
            item.url === choiceOne.url 
              ? { ...item, matched: true }
              : item
          )
        );
      }
      resetTurn();
    }
    return () => {};
  }, [choiceTwo]);

  useEffect(()=>{
    let allMatched = cardData.length && cardData.every(item=> item.matched)
    allMatched && setFinished(true)
  },[cardData])


  const shuffleArray = () => {
    const shuffle = [...imagesArray, ...imagesArray]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ url: item, id: Math.random(), matched: false }));
    setCardData(shuffle);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
  setTimeout(()=>{  setChoiceOne(null);
    setChoiceTwo(null);},400)
    setTurns((prev) => prev + 1);
  };
  console.log(finished,"finish")

  return (
    <div className="mainContainer">
      <h1>Memory Card Game</h1>
      <button onClick={shuffleArray}>Start kr kalra baby</button>
      {turns > 0 && <div className="Turn">{turns +"Turns"}</div>}
      <div className="card-grid">
        {cardData.length > 0 &&
          cardData.map((item) => (
            <SingleCard key={item.id} handleChoice={handleChoice} card={item} flipped= {item === choiceOne || item===choiceTwo || item.matched} />
          ))}
      </div>

    {finished &&   <button onClick={shuffleArray}>Restart Game</button>}
    </div>
  );
};

export default App;
