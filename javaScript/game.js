"use strict";
import formatData from "./questionFormat.js";

const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const gamePage = document.querySelector(".game-page");
const questionText = document.querySelector(".question");
const answerTextList = document.querySelectorAll(".answer");
const showScore = document.querySelector(".score");
const questionNumber = document.querySelector(".question-number");
const nextBtn = document.querySelector(".game-btn2");
const finishBtn = document.querySelector(".game-btn1");
const bonus = 10;
const difficultyLevel =
  JSON.parse(localStorage.getItem("difficulty")) || "easy";
let formattedData = null;
let questionIndex = 0;
let trueAnswer = null;
let score = 0;
let canChoice = true;
let URL = `https://opentdb.com/api.php?amount=10&difficulty=${difficultyLevel}&type=multiple`;

const fetchData = async () => {
  try {
    const res = await fetch(URL);
    const result = await res.json();
    formattedData = formatData(result.results);
    start();
  } catch (err) {
    console.log("error");
    loader.style.display = "none";
    error.style.display = "block";
  }
};

const showAnswer = () => {
  questionNumber.innerText = questionIndex + 1;
  const { question, answers, correctAnswer } = formattedData[questionIndex];
  trueAnswer = correctAnswer;
  console.log(trueAnswer);
  questionText.innerText = question;
  answerTextList.forEach((item, index) => {
    item.innerText = answers[index];
  });
};

const checkAnswer = (event, index) => {
  if (!canChoice) return;
  canChoice = false;
  const answerIndex = index === trueAnswer ? true : false;
  if (answerIndex) {
    event.target.classList.add("correct");
    score += bonus;
    showScore.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerTextList[trueAnswer].classList.add("correct");
  }
};

const nextQuestion = () => {
  questionIndex++;
  if (questionIndex < formattedData.length) {
    canChoice = true;
    removeStyle();
    showAnswer();
  } else {
    finishHandler();
  }
};

const start = () => {
  showAnswer();
  setTimeout(() => {
    loader.style.display = "none";
    gamePage.style.display = "flex";
  }, 1000);
};

const removeStyle = () => {
  answerTextList.forEach((item) =>
    item.classList.remove("correct", "incorrect")
  );
};

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("end.html");
};

window.addEventListener("load", fetchData);

nextBtn.addEventListener("click", nextQuestion);

finishBtn.addEventListener("click", finishHandler);

answerTextList.forEach((item, index) => {
  item.addEventListener("click", (event) => checkAnswer(event, index));
});
