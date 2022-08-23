import React from "react";
import cover from './cover.jpg'
import './SingleCard.css'

const SingleCard = ({card,handleChoice,flipped}) => {
  return (
    <div className="card" >
      <div className={flipped ? "flipped":""}>
        <img className="front" src={card.url} alt="front" />
        <img className="back" onClick={()=>{
          handleChoice(card)
          console.log("clicked")
          }} src={cover} alt="back" />
      </div>
    </div>
  );
};

export default SingleCard;
