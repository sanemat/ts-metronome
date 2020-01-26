import "./index.css";

// @ts-ignore
let audioContext = null;
let playing = false;

function init() {
  audioContext = new AudioContext();
}

function togglePlayer() {
  if (playing) {
    console.log("Stop!");
    playing = false;
    const button = document.querySelector(".header--control");
    if (button) {
      button.innerHTML = "Play";
    }
  } else {
    console.log("Run!");
    playing = true;
    const button = document.querySelector(".header--control");
    if (button) {
      button.innerHTML = "Stop";
    }
  }
}

document.addEventListener("DOMContentLoaded", init);
document
  .querySelector(".header--control")
  ?.addEventListener("click", togglePlayer);
