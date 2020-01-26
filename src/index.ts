import "./index.css";

// @ts-ignore
let audioContext = null;

function init() {
  audioContext = new AudioContext();
}

function play() {
  console.log("played");
}

document.addEventListener("DOMContentLoaded", init);
document.querySelector(".header--control")?.addEventListener("click", play);
