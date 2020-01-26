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
  } else {
    console.log("Run!");
    playing = true;
  }
}

document.addEventListener("DOMContentLoaded", init);
document
  .querySelector(".header--control")
  ?.addEventListener("click", togglePlayer);
