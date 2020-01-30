import "./index.css";

let audioContext: AudioContext = null;
let playing = false;
let schedulerId: number = null;
let nextNoteTime: number = 0;
let scheduleAheadTime: number = 0.2; // 200ms ahead
let tempo = 240;

function init() {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  audioContext = new AudioContext();
}

// https://qiita.com/mohayonao/items/c506f7ddcaac63694eb9
function mtof(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// https://qiita.com/mohayonao/items/c506f7ddcaac63694eb9
function tdur(tempo: number, length: number): number {
  return (60 / tempo) * (4 / length);
}

function coin(destination: AudioDestinationNode, time: number, tempo: number) {
  const t0 = time;
  const t1 = t0 + tdur(tempo, 16);
  const t2 = t0 + tdur(tempo, 4) * 3;
  const si = mtof(83);
  const mi = mtof(88);
  const context = destination.context;
  const oscillator = audioContext.createOscillator();
  const gain = context.createGain();
  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(si, t0);
  oscillator.frequency.setValueAtTime(mi, t1);
  oscillator.start(t0);
  oscillator.stop(t2);
  oscillator.connect(gain);
  gain.gain.setValueAtTime(0.5, t0);
  gain.gain.setValueAtTime(0.5, t1);
  gain.gain.linearRampToValueAtTime(0, t2);
  gain.connect(destination);
}

function scheduleNote(time: number, tempo: number) {
  coin(audioContext.destination, time, tempo);
}

function nextNote(tempo: number) {
  nextNoteTime += 60 / tempo;
}

function schedule() {
  while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
    scheduleNote(nextNoteTime, tempo);
    nextNote(tempo);
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
