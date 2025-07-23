const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast requires accuracy and focus.",
  "Practice makes perfect in the world of typing."
];

let timer = 60;
let timerId;
let startTime;
let correctChars = 0;
let totalTyped = 0;

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accEl = document.getElementById("accuracy");

let currentQuote = "";

function loadQuote() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = currentQuote;
}

function startTimer() {
  startTime = new Date();
  timerId = setInterval(() => {
    timer--;
    timeEl.textContent = timer;

    if (timer === 0) {
      clearInterval(timerId);
      inputEl.disabled = true;
      calculateResult();
    }
  }, 1000);
}

function calculateResult() {
  const minutes = (60 - timer) / 60;
  const wpm = Math.round((correctChars / 5) / minutes);
  const accuracy = Math.round((correctChars / totalTyped) * 100);

  wpmEl.textContent = wpm || 0;
  accEl.textContent = accuracy || 0 + "%";
}

inputEl.addEventListener("input", () => {
  if (timer === 60) startTimer();

  const typed = inputEl.value;
  totalTyped = typed.length;
  correctChars = 0;

  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === currentQuote[i]) {
      correctChars++;
    }
  }
});

function resetTest() {
  clearInterval(timerId);
  timer = 60;
  correctChars = 0;
  totalTyped = 0;
  inputEl.disabled = false;
  inputEl.value = "";
  wpmEl.textContent = "0";
  accEl.textContent = "0%";
  timeEl.textContent = "60";
  loadQuote();
}

loadQuote();
