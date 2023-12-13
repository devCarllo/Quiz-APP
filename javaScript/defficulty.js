"use strict";
const difficulty = document.querySelectorAll(".difficulty-btn");

const difficultyHandler = (index) => {
  if (index === 0) {
    localStorage.setItem("difficulty", JSON.stringify("easy"));
    window.location.assign("/");
  } else if (index === 2) {
    localStorage.setItem("difficulty", JSON.stringify("hard"));
    window.location.assign("/");
  } else {
    localStorage.setItem("difficulty", JSON.stringify("medium"));
    window.location.assign("/");
  }
};

difficulty.forEach((item, index) => {
  item.addEventListener("click", () => difficultyHandler(index));
});
