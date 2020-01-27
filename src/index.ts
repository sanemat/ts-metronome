import "./index.css";

let audioContext: AudioContext = null;
let playing = false;
let beatNumber = 16;

function init() {
  audioContext = new AudioContext();
}

function tick(beatNumber: number) {
  if (!playing) {
    return;
  }
  // create an oscillator
  const oscillator = audioContext.createOscillator();
  oscillator.connect(audioContext.destination);
  if (beatNumber % 16 === 0) {
    // beat 0 == high pitch
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
  } else if (beatNumber % 4 === 0) {
    // quarter notes = medium pitch
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    // other 16th notes = low pitch
  } else {
    oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
  }
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.05);

  // 120BPM
  setTimeout(tick, 500, [beatNumber]);
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
