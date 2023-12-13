"use strict";
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];
const list = document.querySelector(".score-records_container");

const content = highScore.map((score, index) => {
  return `<div class="score-record">
  <span class="score-rank">${index + 1}</span>
  <span class="score-username">${score.name}</span>
  <span class="score-score">${score.score}</span>
  </div>`;
});
const ranking = content.join("");
list.innerHTML = ranking;
