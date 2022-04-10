"use strict";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CELL_SIZE = 75;
const dictionnary = ["METAVERS", "APPLICATION", "GALERIE", "ORDINATEUR"];

class Game {
  constructor() {
    this.maxTry = 6;
    this.currentTry = 1;
    this.positionIndex = 1;
    this.playerWord = [];
  }

  init() {
    //Choose a random word in dictionnary
    const selectRandomWord =
      dictionnary[
        Math.floor(Math.random(dictionnary.length) * dictionnary.length)
      ];
    this.wordLength = selectRandomWord.length;
    //Put the selected word in array
    this.selectedWord = [];
    for (let i = 0; i < this.wordLength; i++) {
      this.selectedWord.push(selectRandomWord.slice(i, i + 1));
    }

    //Set canvas size
    canvas.width = this.wordLength * CELL_SIZE;
    canvas.height = CELL_SIZE * this.maxTry;

    //Drawing grid
    for (let j = 0; j < this.maxTry; j++) {
      for (let i = 0; i < this.wordLength; i++) {
        ctx.strokeStyle = "#ffffff";
        ctx.strokeRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }
  increaseIndex() {
    if (this.positionIndex !== this.wordLength - 1) this.positionIndex += 1;
  }
  decreaseIndex() {
    if (this.positionIndex > 1) this.positionIndex -= 1;
  }
  resetIndex() {
    this.positionIndex = 1;
  }
  drawFirstLetter() {
    ctx.fillStyle = "white";
    ctx.font = "bold 48px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      this.selectedWord[0],
      CELL_SIZE / 2,
      this.currentTry * CELL_SIZE - CELL_SIZE / 2
    );
  }

  drawPoint() {
    ctx.clearRect(
      this.positionIndex * CELL_SIZE + 1,
      (this.currentTry - 1) * CELL_SIZE + 1,
      CELL_SIZE - 2,
      CELL_SIZE - 2
    );
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(
      this.positionIndex * CELL_SIZE + CELL_SIZE / 2,
      this.currentTry * CELL_SIZE - 25,
      5,
      0,
      Math.PI * 2,
      true
    );
    ctx.fill();
  }
  drawLetter(letter) {
    ctx.clearRect(
      this.positionIndex * CELL_SIZE + 1,
      (this.currentTry - 1) * CELL_SIZE + 1,
      CELL_SIZE - 2,
      CELL_SIZE - 2
    );
    ctx.fillStyle = "white";
    ctx.font = "bold 48px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      letter,
      this.positionIndex * CELL_SIZE + CELL_SIZE / 2,
      this.currentTry * CELL_SIZE - CELL_SIZE / 2
    );
  }
  startTry() {
    this.resetIndex();
    game.drawFirstLetter();
    for (let i = 2; i <= this.wordLength; i++) {
      this.drawPoint();
      this.increaseIndex();
    }
    this.resetIndex();
    this.playerWord = [this.selectedWord[0]];
  }
}
document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (
    /[a-zA-Z]/.test(event.key) && //Key pressed is a letter
    event.key.length === 1 && //Key pressed is a single letter (not a key like "escape" or "backspace")
    game.playerWord.length < game.selectedWord.length
  ) {
    game.drawLetter(event.key.toUpperCase());
    game.increaseIndex();
    game.playerWord.push(event.key.toUpperCase()); //Push letter in PlayerWord array
    console.log(game.playerWord);
  }
  if (event.key === "Backspace" && game.positionIndex > 1) {
    if (game.playerWord.length == game.selectedWord.length) {
      //If the word is fully type, we're not decreasing index
      game.drawPoint();
      game.playerWord.pop();
    } else {
      game.decreaseIndex();
      game.drawPoint();
      game.playerWord.pop();
    }
    console.log(game.playerWord);
  }

  if (
    event.key === "Enter" &&
    game.playerWord.length === game.selectedWord.length
  ) {
    game.currentTry += 1;
    game.startTry();
  }
});
const game = new Game();
game.init();
game.startTry();
