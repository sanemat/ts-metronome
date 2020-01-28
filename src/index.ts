import "./index.css";

let audioContext: AudioContext = null;
let playing = false;
let schedulerId: number = null;
let nextNoteTime: number = 0;
let scheduleAheadTime: number = 0.1;// 100ms ahead

function init() {
  audioContext = new AudioContext();
}

function scheduleNote(time: number) {
  // create an oscillator
  const oscillator = audioContext.createOscillator();
  oscillator.connect(audioContext.destination);
  oscillator.frequency.setValueAtTime(880, time);
  oscillator.start(time);
  oscillator.stop(time + 0.05);
}

function nextNote() {
  nextNoteTime += 0.25;// 120BPM
}

function schedule() {
  while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
    scheduleNote(nextNoteTime);
    nextNote();
  }
}

function togglePlayer() {
  if (playing) {
    console.log("Stop!");
    playing = false;
    clearInterval(schedulerId);
    const button = document.querySelector(".header--control");
    if (button) {
      button.innerHTML = "Play";
    }
  } else {
    console.log("Run!");
    playing = true;
    schedulerId = setInterval(schedule, 100);
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
