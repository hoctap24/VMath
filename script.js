let timer;
let time = 20;
let score = 0;
let currentAnswer = 0;

let highScore = localStorage.getItem("vmath_highscore") || 0;
document.getElementById("highScoreValue").innerText = highScore;

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

function startGame() {
  resetGame(false);
  generateProblem();
  timer = setInterval(updateTimer, 1000);
}

function resetGame(resetHigh = false) {
  clearInterval(timer);
  time = 20;
  score = 0;

  document.getElementById("time").innerText = time;
  document.getElementById("currentScore").innerText = score;
  document.getElementById("problem").innerText = "Nhấn Bắt đầu để chơi";
  document.getElementById("options").innerHTML = "";
  document.getElementById("result").innerText = "";

  if (resetHigh) {
    highScore = 0;
    localStorage.removeItem("vmath_highscore");
  }

  document.getElementById("highScoreValue").innerText = highScore;
}

function updateTimer() {
  time--;
  document.getElementById("time").innerText = time;
  if (time <= 0) endGame();
}

function getRangeByLevel() {
  const level = document.getElementById("level").value;
  if (level === "easy") return 10;
  if (level === "medium") return 50;
  return 100;
}

function generateProblem() {
  const range = getRangeByLevel();
  const a = Math.floor(Math.random() * range);
  const b = Math.floor(Math.random() * range) || 1;

  const ops = ["+", "-", "*", "/"];
  const op = ops[Math.floor(Math.random() * ops.length)];

  let text = "";

  switch (op) {
    case "+":
      currentAnswer = a + b;
      text = `${a} + ${b}`;
      break;
    case "-":
      currentAnswer = a - b;
      text = `${a} - ${b}`;
      break;
    case "*":
      currentAnswer = a * b;
      text = `${a} × ${b}`;
      break;
    case "/":
      currentAnswer = Number((a / b).toFixed(2));
      text = `${a} ÷ ${b}`;
      break;
  }

  document.getElementById("problem").innerText = text;
  generateOptions();
}

function generateOptions() {
  const options = [currentAnswer];

  while (options.length < 4) {
    let fake = currentAnswer + (Math.random() * 20 - 10);
    fake = Number(fake.toFixed(2));
    if (!options.includes(fake)) options.push(fake);
  }

  options.sort(() => Math.random() - 0.5);

  const box = document.getElementById("options");
  box.innerHTML = "";

  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(opt);
    box.appendChild(btn);
  });
}

function checkAnswer(choice) {
  if (Math.abs(choice - currentAnswer) < 0.001) {
    score++;
    document.getElementById(
      "result"
    ).innerHTML = `<span class="correct">✔ Chính xác!</span>`;
    document.getElementById("currentScore").innerText = score;
    generateProblem();
  } else {
    document.getElementById(
      "result"
    ).innerHTML = `<span class="incorrect">✖ Sai rồi!</span>`;
  }
}

function endGame() {
  clearInterval(timer);
  document.getElementById("options").innerHTML = "";
  document.getElementById("problem").innerText = "⏰ Hết giờ!";

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("vmath_highscore", highScore);
  }

  document.getElementById("highScoreValue").innerText = highScore;
}

