import {
  startGreenCards,
  startBrownCards,
  startBlueCards,
  sources
} from './dataCards.js';

const ancientsCards = document.querySelectorAll('.ancient-card');
const menu = document.querySelector('.ancients-menu');
const start = document.querySelector('.start-game');
const newGame = document.querySelector('.new-game');

const sectionAncient = document.querySelector('.ancient-select');
const sectionDifficult = document.querySelector('.difficult-select');
const sectionGame = document.querySelector('.game');

const ancientPicture = document.querySelector('.ancient-picture');
const difficultLevels = document.querySelectorAll('.difficult-item');

let choisenAncinet = document.querySelector('.game-deck-ancient');
let choisenDifficult = document.querySelector('.game-deck-difficult');

let currentCard = document.querySelector('.current-card');
const gameDeck = document.querySelector('.game-deck');

const stageContainers = document.querySelectorAll('.stage-container');
const greenDots = document.querySelectorAll('.dot-green');
const brownDots = document.querySelectorAll('.dot-brown');
const blueDots = document.querySelectorAll('.dot-blue');

let ancient = '';
let difficult = 'Средняя';

let greenCards;
let brownCards;
let blueCards;
let finalyDeck = [];
let stage = 1;

function preloadImages(sources) {
  for(let source of sources) {
    let img = document.createElement('img');
    img.src = source;
  }
}
preloadImages(sources);

ancientsCards.forEach(card => {
  card.addEventListener('click', (event) => {
    hideSection(sectionAncient);
    showSection(sectionDifficult);
    if (event.target === ancientsCards[0]) {
      ancientPicture.style.backgroundImage = "url('assets/Ancients/Azathoth.webp')";
      ancient = 'Азатот';
    }
    if (event.target === ancientsCards[1]) {
      ancientPicture.style.backgroundImage = "url('assets/Ancients/Cthulthu.webp')";
      ancient = 'Ктулху';
    }
    if (event.target === ancientsCards[2]) {
      ancientPicture.style.backgroundImage = "url('assets/Ancients/IogSothoth.webp')";
      ancient = 'Йог-Сотот';
    }
    if (event.target === ancientsCards[3]) {
      ancientPicture.style.backgroundImage = "url('assets/Ancients/ShubNiggurath.webp')";
      ancient = 'Шуб-Ниггурат';
    }
    window.scrollTo(0,0);
  });
});

menu.addEventListener('click', () => {
  hideSection(sectionDifficult);
  hideSection(sectionGame);
  showSection(sectionAncient);
});

newGame.addEventListener('click', () => {
  hideSection(sectionDifficult);
  hideSection(sectionGame);
  showSection(sectionAncient);

  difficultLevels[2].classList.add('choise');
  difficult = 'Средняя';
  stage = 1;

  stageContainers.forEach(elem => elem.classList.add('unactive'));
  stageContainers[0].classList.remove('unactive');

  currentCard.style.background = 'rgba(0, 0, 0, 0.5)';
  currentCard.style.boxShadow = '0px 0px 5px 4px rgba(0, 0, 0, 0.5)';
  currentCard.style.width = '266px';
  gameDeck.style.display = 'flex';
});

difficultLevels.forEach(level => {
  level.addEventListener('click', (event) => {
    if (event.target === level) {
      difficultLevels.forEach(elem => elem.classList.remove('choise'));
      level.classList.add('choise');
      difficult = `${level.textContent}`;
    }
  });
});

start.addEventListener('click', () => {
  hideSection(sectionDifficult);
  hideSection(sectionAncient);
  showSection(sectionGame);
  choisenAncinet.textContent = ancient;
  choisenDifficult.textContent = difficult;
  difficultLevels.forEach(elem => elem.classList.remove('choise'));

  if (ancient === 'Азатот') {
    greenDots[0].textContent = 1;
    greenDots[1].textContent = 2;
    greenDots[2].textContent = 2;

    brownDots[0].textContent = 2;
    brownDots[1].textContent = 3;
    brownDots[2].textContent = 4;

    blueDots[0].textContent = 1;
    blueDots[1].textContent = 1;
    blueDots[2].textContent = 0;
  }

  if (ancient === 'Ктулху') {
    greenDots[0].textContent = 0;
    greenDots[1].textContent = 1;
    greenDots[2].textContent = 3;

    brownDots[0].textContent = 2;
    brownDots[1].textContent = 3;
    brownDots[2].textContent = 4;

    blueDots[0].textContent = 2;
    blueDots[1].textContent = 0;
    blueDots[2].textContent = 0;
  }

  if (ancient === 'Йог-Сотот') {
    greenDots[0].textContent = 0;
    greenDots[1].textContent = 2;
    greenDots[2].textContent = 3;

    brownDots[0].textContent = 2;
    brownDots[1].textContent = 3;
    brownDots[2].textContent = 4;

    blueDots[0].textContent = 1;
    blueDots[1].textContent = 1;
    blueDots[2].textContent = 0;
  }

  if (ancient === 'Шуб-Ниггурат') {
    greenDots[0].textContent = 1;
    greenDots[1].textContent = 3;
    greenDots[2].textContent = 2;

    brownDots[0].textContent = 2;
    brownDots[1].textContent = 2;
    brownDots[2].textContent = 4;

    blueDots[0].textContent = 1;
    blueDots[1].textContent = 1;
    blueDots[2].textContent = 0;
  }

  getFinalyDeck();
});

function hideSection(section) {
  section.classList.add('hide');
  section.classList.remove('show');
}

function showSection(section) {
  section.classList.add('show');
  section.classList.remove('hide');
}

// algoritm

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getFinalyDeck() {

  let greenCardsMini;
  let brownCardsMini;
  let blueCardsMini;

  let greenCardsStage1;
  let greenCardsStage2;
  let greenCardsStage3;

  let brownCardsStage1;
  let brownCardsStage2;
  let brownCardsStage3;

  let blueCardsStage1;
  let blueCardsStage2;
  let blueCardsStage3;

  let cardDeck1 = [];
  let cardDeck2 = [];
  let cardDeck3 = [];
  finalyDeck = [];

  if (difficult === 'Очень легкая') {
    greenCards = startGreenCards.filter(card => (card.difficulty === 'easy'));
    while (greenCards.length < (Number(greenDots[0].textContent) + Number(greenDots[1].textContent) + Number(greenDots[2].textContent))) {
      greenCards.push(startGreenCards.find(card => (card.difficulty === 'normal')));
      shuffle(startGreenCards);
      startGreenCards.splice(0,1);
    }

    brownCards = startBrownCards.filter(card => (card.difficulty === 'easy'));
    while (brownCards.length < (Number(brownDots[0].textContent) + Number(brownDots[1].textContent) + Number(brownDots[2].textContent))) {
      brownCards.push(startBrownCards.find(card => (card.difficulty === 'normal')));
      shuffle(startBrownCards);
      startBrownCards.splice(0,1);
    }
    blueCards = startBlueCards.filter(card => (card.difficulty === 'easy'));
  }

  if (difficult === 'Легкая') {
    greenCards = startGreenCards.filter(card => (card.difficulty === 'easy') || (card.difficulty === 'normal'));
    brownCards = startBrownCards.filter(card => (card.difficulty === 'easy') || (card.difficulty === 'normal'));
    blueCards = startBlueCards.filter(card => (card.difficulty === 'easy') || (card.difficulty === 'normal'));
  }

  if (difficult === 'Средняя') {
    greenCards = startGreenCards;
    brownCards = startBrownCards;
    blueCards = startBlueCards;
  }

  if (difficult === 'Сложная') {
    greenCards = startGreenCards.filter(card => (card.difficulty === 'hard') || (card.difficulty === 'normal'));
    brownCards = startBrownCards.filter(card => (card.difficulty === 'hard') || (card.difficulty === 'normal'));
    blueCards = startBlueCards.filter(card => (card.difficulty === 'hard') || (card.difficulty === 'normal'));
  }

  if (difficult === 'Очень сложная') {
    greenCards = startGreenCards.filter(card => (card.difficulty === 'hard'));
    while (greenCards.length < (Number(greenDots[0].textContent) + Number(greenDots[1].textContent) + Number(greenDots[2].textContent))) {
      greenCards.push(startGreenCards.find(card => (card.difficulty === 'normal')));
      shuffle(startGreenCards);
      startGreenCards.splice(0,1);
    }

    brownCards = startBrownCards.filter(card => (card.difficulty === 'hard'));
    while (brownCards.length < (Number(brownDots[0].textContent) + Number(brownDots[1].textContent) + Number(brownDots[2].textContent))) {
      brownCards.push(startBrownCards.find(card => (card.difficulty === 'normal')));
      shuffle(startBrownCards);
      startBrownCards.splice(0,1);
    }
    blueCards = startBlueCards.filter(card => (card.difficulty === 'hard'));
  }

  shuffle(greenCards);
  shuffle(brownCards);
  shuffle(blueCards);

  if (ancient === 'Азатот') {

    greenCardsMini = greenCards.slice(0, 5);
    brownCardsMini = brownCards.slice(0, 9);
    blueCardsMini = blueCards.slice(0, 2);

    greenCardsStage1 = greenCardsMini.splice(0, 1);
    greenCardsStage2 = greenCardsMini.splice(0, 2);
    greenCardsStage3 = greenCardsMini.splice(0, 2);

    brownCardsStage1 = brownCardsMini.splice(0, 2);
    brownCardsStage2 = brownCardsMini.splice(0, 3);
    brownCardsStage3 = brownCardsMini.splice(0, 4);

    blueCardsStage1 = blueCardsMini.splice(0, 1);
    blueCardsStage2 = blueCardsMini.splice(0, 1);
    blueCardsStage3 = blueCardsMini.splice(0, 0);
  }

  if (ancient === 'Ктулху') {
    greenCardsMini = greenCards.slice(0, 4);
    brownCardsMini = brownCards.slice(0, 9);
    blueCardsMini = blueCards.slice(0, 2);

    greenCardsStage1 = greenCardsMini.splice(0, 0);
    greenCardsStage2 = greenCardsMini.splice(0, 1);
    greenCardsStage3 = greenCardsMini.splice(0, 3);

    brownCardsStage1 = brownCardsMini.splice(0, 2);
    brownCardsStage2 = brownCardsMini.splice(0, 3);
    brownCardsStage3 = brownCardsMini.splice(0, 4);

    blueCardsStage1 = blueCardsMini.splice(0, 2);
    blueCardsStage2 = blueCardsMini.splice(0, 0);
    blueCardsStage3 = blueCardsMini.splice(0, 0);
  }

  if (ancient === 'Йог-Сотот') {
    greenCardsMini = greenCards.slice(0, 5);
    brownCardsMini = brownCards.slice(0, 9);
    blueCardsMini = blueCards.slice(0, 2);

    greenCardsStage1 = greenCardsMini.splice(0, 0);
    greenCardsStage2 = greenCardsMini.splice(0, 2);
    greenCardsStage3 = greenCardsMini.splice(0, 3);

    brownCardsStage1 = brownCardsMini.splice(0, 2);
    brownCardsStage2 = brownCardsMini.splice(0, 3);
    brownCardsStage3 = brownCardsMini.splice(0, 4);

    blueCardsStage1 = blueCardsMini.splice(0, 1);
    blueCardsStage2 = blueCardsMini.splice(0, 1);
    blueCardsStage3 = blueCardsMini.splice(0, 0);
  }

  if (ancient === 'Шуб-Ниггурат') {
    greenCardsMini = greenCards.slice(0, 6);
    brownCardsMini = brownCards.slice(0, 8);
    blueCardsMini = blueCards.slice(0, 2);

    greenCardsStage1 = greenCardsMini.splice(0, 1);
    greenCardsStage2 = greenCardsMini.splice(0, 3);
    greenCardsStage3 = greenCardsMini.splice(0, 2);

    brownCardsStage1 = brownCardsMini.splice(0, 2);
    brownCardsStage2 = brownCardsMini.splice(0, 2);
    brownCardsStage3 = brownCardsMini.splice(0, 4);

    blueCardsStage1 = blueCardsMini.splice(0, 1);
    blueCardsStage2 = blueCardsMini.splice(0, 1);
    blueCardsStage3 = blueCardsMini.splice(0, 0);
  }

  cardDeck1 = cardDeck1.concat(greenCardsStage1).concat(brownCardsStage1).concat(blueCardsStage1).reverse();
  shuffle(cardDeck1);
  cardDeck2 = cardDeck2.concat(greenCardsStage2).concat(brownCardsStage2).concat(blueCardsStage2).reverse();
  shuffle(cardDeck2);
  cardDeck3 = cardDeck3.concat(greenCardsStage3).concat(brownCardsStage3).concat(blueCardsStage3).reverse();
  shuffle(cardDeck3);

  finalyDeck = finalyDeck.concat(cardDeck3).concat(cardDeck2).concat(cardDeck1);
}


function setCurrentCard (color) {
  currentCard.style.background = finalyDeck[finalyDeck.length - 1].cardFace;
  currentCard.style.boxShadow = `0px 0px 5px 4px ${color}`;
  currentCard.style.backgroundSize = 'cover';
  currentCard.style.backgroundPosition = 'center';
}

function endGame () {
  stageContainers.forEach(elem => elem.classList.add('unactive'));
  currentCard.style.background = 'url(assets/game-over1.png) no-repeat';
  currentCard.style.backgroundSize = '100% 100%';
  currentCard.style.boxShadow = '0px 0px 5px 4px rgba(212, 209, 41, 0.777)';
  currentCard.style.backgroundPosition = 'center';
  gameDeck.style.display = 'none';
}


gameDeck.addEventListener('click', () => {
  if (stage === 1) {
    if (greenDots[0].textContent > 0 && finalyDeck[finalyDeck.length - 1].color === 'green') {
      greenDots[0].textContent = greenDots[0].textContent - 1;
      setCurrentCard ('rgba(3, 100, 17, 0.62)');
      finalyDeck.pop();
    } else if (brownDots[0].textContent > 0 && finalyDeck[finalyDeck.length - 1].color === 'brown') {
      brownDots[0].textContent = brownDots[0].textContent - 1;
      setCurrentCard('rgba(100, 19, 17, 0.755)');
      finalyDeck.pop();
    } else if (blueDots[0].textContent > 0 && finalyDeck[finalyDeck.length - 1].color === 'blue') {
      blueDots[0].textContent = blueDots[0].textContent - 1;
      currentCard.style.background = finalyDeck[finalyDeck.length - 1].cardFace;
      setCurrentCard('rgba(21, 45, 167, 0.62)');
      finalyDeck.pop();
    }
    if (greenDots[0].textContent == 0 && brownDots[0].textContent == 0 && blueDots[0].textContent == 0) {
      stage++;
      stageContainers.forEach(elem => elem.classList.add('unactive'));
      stageContainers[1].classList.remove('unactive');
    }
  } else if (stage === 2) {
    if (greenDots[1].textContent > 0 && finalyDeck[finalyDeck.length - 1].color === 'green') {
      greenDots[1].textContent = greenDots[1].textContent - 1;
      setCurrentCard ('rgba(3, 100, 17, 0.62)');
      finalyDeck.pop();
    } else if (brownDots[1].textContent > 0 && finalyDeck[finalyDeck.length - 1].color === 'brown') {
      brownDots[1].textContent = brownDots[1].textContent - 1;
      setCurrentCard('rgba(100, 19, 17, 0.755)');
      finalyDeck.pop();
    } else if (blueDots[1].textContent > 0 && finalyDeck[finalyDeck.length - 1].color === 'blue') {
      blueDots[1].textContent = blueDots[1].textContent - 1;
      setCurrentCard('rgba(21, 45, 167, 0.62)');
      finalyDeck.pop();
    }
    if (greenDots[1].textContent == 0 && brownDots[1].textContent == 0 && blueDots[1].textContent == 0) {
      stage++;
      stageContainers.forEach(elem => elem.classList.add('unactive'));
      stageContainers[2].classList.remove('unactive');
    }
  } else if (stage === 3) {
    if (greenDots[2].textContent > 0 && finalyDeck[finalyDeck.length - 1].color === 'green') {
      greenDots[2].textContent = greenDots[2].textContent - 1;
      setCurrentCard ('rgba(3, 100, 17, 0.62)');
      finalyDeck.pop();
    } else if (brownDots[2].textContent > 0 && finalyDeck[finalyDeck.length - 1].color === 'brown') {
      brownDots[2].textContent = brownDots[2].textContent - 1;
      setCurrentCard('rgba(100, 19, 17, 0.755)');
      finalyDeck.pop();
    } else if (blueDots[2].textContent > 0 && finalyDeck[finalyDeck.length - 1].color === 'blue') {
      blueDots[2].textContent = blueDots[2].textContent - 1;
      setCurrentCard('rgba(21, 45, 167, 0.62)');
      finalyDeck.pop();
    } else if (greenDots[2].textContent == 0 && brownDots[2].textContent == 0 && blueDots[2].textContent == 0) {
      endGame ();
    }
  }
});

