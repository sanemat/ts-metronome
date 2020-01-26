import "./index.css";

let audioContext: AudioContext = null;
let playing = false;
let beatNumber = 16;

function init() {
  audioContext = new AudioContext();
}

function tick(beatNumber: number) {
  // create an oscillator
  const osc = audioContext.createOscillator();
  osc.connect(audioContext.destination);
  if (beatNumber % 16 === 0) {
    // beat 0 == high pitch
    osc.frequency.setValueAtTime(880, audioContext.currentTime);
  } else if (beatNumber % 4 === 0) {
    // quarter notes = medium pitch
    osc.frequency.setValueAtTime(440, audioContext.currentTime);
    // other 16th notes = low pitch
  } else {
    osc.frequency.setValueAtTime(220, audioContext.currentTime);
  }
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 50);
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
    tick(beatNumber);
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
