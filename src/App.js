import React, {useEffect, useState, useRef} from 'react';
import CharacterCard from './CharacterCard';
import './App.css';

const imagesArray = [
  {
    type: "img1",
    image: require('https://drive.google.com/file/d/1EpdyAOPTgkkEqkOWGOPjcpkls-DxLHW9/view?usp=sharing')
  },
  {
    type: "img2",
    image: require('https://drive.google.com/file/d/1_3giSMWXm_Bkmq0UdDm8XfaSJ7Dq0b10/view?usp=sharing')
  },
  {
    type: "img3",
    image: require('https://drive.google.com/file/d/1M_HaWRuoLFWPc3ivr_NiNHnJ2mg3rPJr/view?usp=sharing')
  },
  {
    type: "img4",
    image: require('https://drive.google.com/file/d/1CyhuK4SBSGzgPerGppdxiZIVFpez-qDB/view?usp=sharing')
  },
  {
    type: "img5",
    image: require('https://drive.google.com/file/d/1M_HaWRuoLFWPc3ivr_NiNHnJ2mg3rPJr/view?usp=sharing')
  },
  {
    type: "img6",
    image: require('https://drive.google.com/file/d/17QBHjkFX6ZLu20qZi-qfM6bB1eK3_y4l/view?usp=sharing')
  }
];

function shuffleCards(array) {
  const length = array.length;
  for (let i=length; i>0 ; i--) {
    const randomIndex = Math.floor(Math.random()*i);
    const currentIndex = i-1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

export default function App() {
  const [cards, setCards]=useState (
    shuffleCards.bind(null, imagesArray.concat(imagesArray))
  );

}

return (
  <div className="App">
    <header>
      <h3>Play the Flip card game</h3>
      <div>Select two cards with same content consequtively to make them vanish</div>
    </header>

    <div className="container">
      {cards.map((card, index) => {
        return (
          <Card key = {index}
          card = {card}
          index = {index}
          isDisabled = {shouldDisableAllCards}
          isInactive = {checkIsInactive(card)}
          isFlipped = {chackIsFlipped(index)}
          onClock = {handleCardClick}
          />
        );
      })}
    </div>

    <footer>
      <div className = "score">
        <div className = "move">
          <span className ="bold">Move : </span> {move}
        </div>
        {localStorage.getItem("bestScore") && (
          <div className = "high-score">
            <span className = "bold">Best Score : </span> {bestScore}
          </div>
        )}
      </div>
    </footer>
  </div>
)