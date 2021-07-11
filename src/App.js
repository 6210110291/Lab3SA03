import React, {useEffect, useState, useRef} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle
} from "@material-ui/core";
import CharacterCard from './CharacterCard';
import './App.scss';

const imagesArray = [
  {
    type: "img1",
    image: require('./images/img1')
  },
  {
    type: "img2",
    image: require('./images/img2')
  },
  {
    type: "img3",
    image: require('./images/img3')
  },
  {
    type: "img4",
    image: require('./images/img4')
  },
  {
    type: "img5",
    image: require('./images/img5')
  },
  {
    type: "img6",
    image: require('./images/img6')
  }
];

function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0 ; i--) {
    const randomIndex = Math.floor(Math.random()*i);
    const currentIndex = i-1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

export default function App() {
  const [cards, setCards] = useState (
    shuffleCards.bind(null, imagesArray.concat(imagesArray))
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
  );
  const timeout = useRef(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === imagesArray.length) {
      setShowModal(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore);
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }
    
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);
  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    setCards(shuffleCards(imagesArray.concat(imagesArray)));
  };



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
        <div className = "moves">
          <span className ="bold">Moves : </span> {moves}
        </div>
        {localStorage.getItem("bestScore") && (
          <div className = "high-score">
            <span className = "bold">Best Score : </span> {bestScore}
          </div>
        )}
      </div>

      <div className = "restart">
        <Buttom onClock={handleReStart} color="primary" variant="contained">
          Restart
        </Buttom>
      </div>
    </footer>

    <Dialog open = {showModal}
    disableBackdropClick
    disableEscapeKwyDown
    aria-labelledby = "alert-dialog-title"
    aria-describeadby = "alert-dialog-description"
    >
      <DialogTitle id = "alert-dialog-title">
        Yeah!! You win!
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You completed the game in {moves} moves. Your best score is{" "} {bestScore} moves.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleRestart} color="primary">
          Restart
        </Button>
        </DialogActions>
    </Dialog>
  </div>
);
}