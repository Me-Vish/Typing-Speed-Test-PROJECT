let timer = 60; 
let timerId;
let correctChars = 0;
let totalTyped = 0;
let currentQuote = "";

const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast requires accuracy and focus.",
  "Practice makes perfect in the world of typing."
];

function loadQuote() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").textContent = currentQuote;
}

function startTimer() {
  timerId = setInterval(() => {
    timer--;
    document.getElementById("time").textContent = `${timer}s`;

    if (timer === 0) {
      clearInterval(timerId);
      document.getElementById("input").disabled = true;
      calculateResult();
    }
  }, 1000);
}

function calculateResult() {
  const timeUsed = 60 - timer; // seconds used
  const minutes = timeUsed / 60;

  const wpm = Math.round((correctChars / 5) / minutes);
  const accuracy = Math.round((correctChars / totalTyped) * 100) || 0;

  document.getElementById("wpm").textContent = wpm;
  document.getElementById("accuracy").textContent = `${accuracy}%`;
}

document.getElementById("input").addEventListener("input", () => {
  if (timer === 60) startTimer();

  const typed = document.getElementById("input").value;
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
  timer = parseInt(document.getElementById("timeSelect").value);
  correctChars = 0;
  totalTyped = 0;

  document.getElementById("time").textContent = `${timer}s`;
  document.getElementById("input").disabled = false;
  document.getElementById("input").value = "";
  document.getElementById("wpm").textContent = "0";
  document.getElementById("accuracy").textContent = "0%";

  loadQuote();
}
