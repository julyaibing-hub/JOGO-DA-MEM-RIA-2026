let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const cols = 4;
const rows = 4;
const cardSize = 100;

// Emojis com tema agrinho (campo/fazenda)
let values = ["🐄","🐄","🐖","🐖","🌽","🌽","🍎","🍎",
              "🐓","🐓","🥕","🥕","🌻","🌻","🚜","🚜"];

function setup() {
  createCanvas(cols * cardSize, rows * cardSize);

  shuffleArray(values);

  for (let i = 0; i < values.length; i++) {
    cards.push({
      value: values[i],
      revealed: false,
      matched: false
    });
  }

  textAlign(CENTER, CENTER);
  textSize(48);
}

function draw() {
  background(150, 220, 180); // verde de fazenda

  for (let i = 0; i < cards.length; i++) {
    let x = (i % cols) * cardSize;
    let y = floor(i / cols) * cardSize;

    stroke(0);
    strokeWeight(2);

    if (cards[i].revealed || cards[i].matched) {
      fill(255);
      rect(x, y, cardSize, cardSize, 10);
      text(cards[i].value, x + cardSize / 2, y + cardSize / 2 + 5);
    } else {
      fill(100, 150, 255);
      rect(x, y, cardSize, cardSize, 10);
      fill(255);
      text("❓", x + cardSize / 2, y + cardSize / 2 + 5);
    }
  }

  checkWin();
}

function mousePressed() {
  if (lockBoard) return;

  let col = floor(mouseX / cardSize);
  let row = floor(mouseY / cardSize);
  let index = row * cols + col;

  if (
    index < 0 ||
    index >= cards.length ||
    cards[index].revealed ||
    cards[index].matched
  ) {
    return;
  }

  cards[index].revealed = true;

  if (firstCard === null) {
    firstCard = index;
  } else {
    secondCard = index;
    lockBoard = true;

    if (cards[firstCard].value === cards[secondCard].value) {
      cards[firstCard].matched = true;
      cards[secondCard].matched = true;

      resetTurn();
    } else {
      setTimeout(() => {
        cards[firstCard].revealed = false;
        cards[secondCard].revealed = false;

        resetTurn();
      }, 1000);
    }
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function checkWin() {
  let won = cards.every(card => card.matched);

  if (won) {
    fill(255, 50, 50);
    textSize(48);
    text("PARABÉNS, AGRINHO!", width / 2, height / 2);
  }
}
