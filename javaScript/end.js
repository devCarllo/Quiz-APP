"use strict";
const score = document.querySelector(".end-score span");
const nameInput = document.getElementById("end-name");
const saveBtn = document.querySelector(".end-save");
const alertMessage = document.querySelector(".alert");

const userScore = JSON.parse(localStorage.getItem("score"));
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];

score.innerText = userScore;

const showAlert = (message) => {
  alertMessage.innerText = message;
  setTimeout(() => {
    alertMessage.style.display = "block";
  });
  setTimeout(() => {
    alertMessage.style.display = "none";
  }, 2000);
};

const saveHandler = () => {
  if (!nameInput.value || !userScore) {
    showAlert("Invalid User Name or Score");
  } else {
    const finalScore = { name: nameInput.value, score: userScore };
    highScore.push(finalScore);
    highScore.sort((a, b) => b.score - a.score);
    highScore.splice(10);
    localStorage.setItem("highScore", JSON.stringify(highScore));
    localStorage.removeItem("score");
    nameInput.value = "";
    window.location.assign("https://realthecarlo.github.io/Quiz-APP/index.html");
  }
};

saveBtn.addEventListener("click", saveHandler);
