const arcade = {
  playerName: "Sami",
  ageLevel: 25,
  date: "July 12, 2026",
  place: "The Neon Room",
  heroLabel: "Player one birthday mode",
  heroText: "Join Sami for a neon birthday quest, collect bonus points, and unlock the final gift code.",
  giftText: "Finish the level with one more tap. Replace this with a real gift clue, party address detail, or secret message.",
  giftCode: "CAKE-MODE",
  prizes: [
    "Birthday power-up",
    "Cake multiplier",
    "Dance floor boost",
    "Memory token",
    "Laugh combo",
    "Photo reward",
    "Wish upgrade",
    "Final prize"
  ]
};

const startScreen = document.getElementById("startScreen");
const page = document.getElementById("page");
const scoreDisplay = document.getElementById("scoreDisplay");
const playfield = document.getElementById("playfield");
const tokenCount = document.getElementById("tokenCount");
const timerCount = document.getElementById("timerCount");
const gameButton = document.getElementById("gameButton");
const gameMessage = document.getElementById("gameMessage");
const confetti = document.getElementById("confetti");
const prizeDialog = document.getElementById("prizeDialog");

let score = 0;
let collected = 0;
let seconds = 20;
let gameActive = false;
let gameTimer;
let tokenTimer;

function applyContent() {
  document.title = `${arcade.playerName} Birthday Arcade`;
  document.getElementById("heroLabel").textContent = arcade.heroLabel;
  document.getElementById("heroTitle").textContent = `Level ${arcade.ageLevel} unlocked`;
  document.getElementById("heroText").textContent = arcade.heroText;
  document.getElementById("playerName").textContent = arcade.playerName;
  document.getElementById("partyDate").textContent = arcade.date;
  document.getElementById("partyPlace").textContent = arcade.place;
  document.getElementById("giftText").textContent = arcade.giftText;
}

function renderPrizes() {
  const grid = document.getElementById("prizeGrid");
  grid.innerHTML = "";
  arcade.prizes.forEach((name, index) => {
    const button = document.createElement("button");
    button.className = "prize";
    button.type = "button";
    button.dataset.index = String(index);
    button.innerHTML = `
      <img src="assets/prize-${String(index + 1).padStart(2, "0")}.png" alt="${name}">
      <span>${name}</span>
    `;
    grid.appendChild(button);
  });
}

function showPage() {
  startScreen.classList.add("is-hidden");
  page.classList.add("is-visible");
  page.removeAttribute("aria-hidden");
  document.body.classList.remove("locked");
  addScore(250);
  burst(70);
}

function addScore(points) {
  score += points;
  scoreDisplay.textContent = String(score).padStart(4, "0");
}

function burst(amount = 36) {
  const colors = ["#ff2f92", "#1fe1ff", "#ffd154", "#9a65ff", "#42f59b", "#ffffff"];
  for (let i = 0; i < amount; i += 1) {
    const bit = document.createElement("span");
    bit.className = "bit";
    bit.style.left = `${Math.random() * 100}%`;
    bit.style.background = colors[i % colors.length];
    bit.style.animationDelay = `${Math.random() * .35}s`;
    bit.style.setProperty("--drift", `${(Math.random() - .5) * 260}px`);
    confetti.appendChild(bit);
    setTimeout(() => bit.remove(), 2200);
  }
}

function spawnToken() {
  if (!gameActive) return;
  const token = document.createElement("button");
  token.className = "token";
  token.type = "button";
  token.setAttribute("aria-label", "Collect birthday token");
  const field = playfield.getBoundingClientRect();
  token.style.left = `${Math.max(8, Math.random() * (field.width - 56))}px`;
  token.style.top = `${Math.max(8, Math.random() * (field.height - 56))}px`;
  token.addEventListener("click", () => {
    collected += 1;
    tokenCount.textContent = String(collected);
    addScore(100);
    token.remove();
    if (collected >= 10) finishGame(true);
  }, { once: true });
  playfield.appendChild(token);
  setTimeout(() => token.remove(), 1600);
}

function startGame() {
  playfield.innerHTML = "";
  collected = 0;
  seconds = 20;
  gameActive = true;
  tokenCount.textContent = "0";
  timerCount.textContent = "20";
  gameButton.disabled = true;
  gameMessage.textContent = "Bonus round active.";
  spawnToken();
  tokenTimer = setInterval(spawnToken, 650);
  gameTimer = setInterval(() => {
    seconds -= 1;
    timerCount.textContent = String(seconds);
    if (seconds <= 0) finishGame(false);
  }, 1000);
}

function finishGame(won) {
  if (!gameActive) return;
  gameActive = false;
  clearInterval(gameTimer);
  clearInterval(tokenTimer);
  playfield.innerHTML = "";
  gameButton.disabled = false;
  if (won) {
    addScore(750);
    burst(90);
    gameMessage.textContent = "Bonus cleared. Cake mode unlocked.";
  } else {
    gameMessage.textContent = "Time up. Try the bonus round again.";
  }
}

function setupRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .16 });
  document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
}

function setupPrizeDialog() {
  const dialogImage = document.getElementById("dialogImage");
  const dialogLabel = document.getElementById("dialogLabel");
  const dialogTitle = document.getElementById("dialogTitle");
  const dialogText = document.getElementById("dialogText");
  document.getElementById("prizeGrid").addEventListener("click", (event) => {
    const prize = event.target.closest(".prize");
    if (!prize) return;
    const index = Number(prize.dataset.index);
    dialogImage.src = `assets/prize-${String(index + 1).padStart(2, "0")}.png`;
    dialogImage.alt = arcade.prizes[index];
    dialogLabel.textContent = `Reward ${String(index + 1).padStart(2, "0")}`;
    dialogTitle.textContent = arcade.prizes[index];
    dialogText.textContent = "Replace this with a real photo, personal reward, birthday coupon, or inside joke.";
    if (typeof prizeDialog.showModal === "function") prizeDialog.showModal();
    addScore(50);
  });
  document.getElementById("closeDialog").addEventListener("click", () => prizeDialog.close());
  prizeDialog.addEventListener("click", (event) => {
    if (event.target === prizeDialog) prizeDialog.close();
  });
}

function revealGiftCode() {
  document.getElementById("codeBox").textContent = arcade.giftCode;
  addScore(500);
  burst(90);
}

applyContent();
renderPrizes();
setupRevealObserver();
setupPrizeDialog();

document.getElementById("startButton").addEventListener("click", showPage);
gameButton.addEventListener("click", startGame);
document.getElementById("giftButton").addEventListener("click", revealGiftCode);
