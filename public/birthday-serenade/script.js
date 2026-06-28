const serenade = {
  name: "Lina",
  date: "August 9, 2026",
  place: "Rooftop Garden",
  dress: "Soft romance",
  heroKicker: "Tonight belongs to Lina",
  heroTitle: "Happy birthday, my love",
  heroText: "A candlelit birthday invitation for dinner, memories, music, and one wish under the moon.",
  letter: "Tonight is not just about candles or cake. It is about celebrating the way you make the world softer, brighter, and easier to love. I want this birthday to feel like a song written only for you, slow enough to remember and warm enough to keep.",
  hiddenLines: [
    "I would choose your laugh as the soundtrack every time.",
    "You are still my favorite reason to plan beautiful things.",
    "Every year of you feels like more light in the room."
  ],
  wish: "May this year love you back in every language you understand.",
  bouquetMessage: "The bouquet is complete. Your birthday promise: more tenderness, more slow dances, more us.",
  moments: Array.from({ length: 10 }, (_, index) => ({
    src: `assets/moment-${String(index + 1).padStart(2, "0")}.png`,
    title: `Moonlit moment ${String(index + 1).padStart(2, "0")}`,
    text: "A soft little memory from a night made for love."
  }))
};

const candleGate = document.getElementById("candleGate");
const page = document.getElementById("page");
const sparkLayer = document.getElementById("sparkLayer");
const memoryDialog = document.getElementById("memoryDialog");
let hiddenIndex = 0;
let collectedPetals = 0;

function applyContent() {
  document.title = `${serenade.name} Birthday Serenade`;
  document.getElementById("heroKicker").textContent = serenade.heroKicker;
  document.getElementById("heroTitle").textContent = serenade.heroTitle;
  document.getElementById("heroText").textContent = serenade.heroText;
  document.getElementById("dateText").textContent = serenade.date;
  document.getElementById("placeText").textContent = serenade.place;
  document.getElementById("dressText").textContent = serenade.dress;
  document.getElementById("letterText").textContent = serenade.letter;
  document.getElementById("wishText").textContent = serenade.wish;
  document.getElementById("footerLine").textContent = `Made for ${serenade.name}, with all my love.`;
}

function renderMemories() {
  const strip = document.getElementById("filmStrip");
  strip.innerHTML = "";
  serenade.moments.forEach((moment, index) => {
    const button = document.createElement("button");
    button.className = "memory";
    button.type = "button";
    button.dataset.index = String(index);
    button.innerHTML = `
      <img src="${moment.src}" alt="${moment.title}">
      <span>${moment.title}</span>
    `;
    strip.appendChild(button);
  });
}

function renderPetals() {
  const field = document.getElementById("petalField");
  field.innerHTML = "";
  const positions = [
    [14, 18, -18], [48, 14, 24], [72, 30, -32],
    [22, 58, 18], [55, 62, -8], [78, 72, 34]
  ];
  positions.forEach(([left, top, turn], index) => {
    const petal = document.createElement("button");
    petal.className = "petal";
    petal.type = "button";
    petal.style.left = `${left}%`;
    petal.style.top = `${top}%`;
    petal.style.setProperty("--turn", `${turn}deg`);
    petal.setAttribute("aria-label", `Collect petal ${index + 1}`);
    petal.addEventListener("click", () => collectPetal(petal), { once: true });
    field.appendChild(petal);
  });
}

function openPage() {
  candleGate.classList.add("is-lit");
  sparkle(46);
  setTimeout(() => {
    candleGate.classList.add("is-hidden");
    page.classList.add("is-visible");
    page.removeAttribute("aria-hidden");
    document.body.classList.remove("locked");
  }, 850);
}

function sparkle(amount = 30) {
  const colors = ["#ff6d8b", "#ffc66a", "#3dc1a9", "#fff0d2", "#ffffff"];
  for (let i = 0; i < amount; i += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = `${Math.random() * 100}%`;
    spark.style.background = colors[i % colors.length];
    spark.style.animationDelay = `${Math.random() * .35}s`;
    spark.style.setProperty("--drift", `${(Math.random() - .5) * 230}px`);
    sparkLayer.appendChild(spark);
    setTimeout(() => spark.remove(), 2300);
  }
}

function revealHiddenLine() {
  document.getElementById("hiddenLine").textContent = serenade.hiddenLines[hiddenIndex];
  hiddenIndex = (hiddenIndex + 1) % serenade.hiddenLines.length;
  sparkle(18);
}

function collectPetal(petal) {
  collectedPetals += 1;
  petal.classList.add("is-collected");
  sparkle(10);
  if (collectedPetals >= 6) {
    document.getElementById("bouquetMessage").textContent = serenade.bouquetMessage;
    sparkle(56);
  }
}

function releaseLantern() {
  document.querySelector(".lantern").classList.add("is-released");
  sparkle(72);
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

function setupMemoryDialog() {
  const image = document.getElementById("dialogImage");
  const kicker = document.getElementById("dialogKicker");
  const title = document.getElementById("dialogTitle");
  const text = document.getElementById("dialogText");
  document.getElementById("filmStrip").addEventListener("click", (event) => {
    const item = event.target.closest(".memory");
    if (!item) return;
    const moment = serenade.moments[Number(item.dataset.index)];
    image.src = moment.src;
    image.alt = moment.title;
    kicker.textContent = "Memory film";
    title.textContent = moment.title;
    text.textContent = moment.text;
    if (typeof memoryDialog.showModal === "function") memoryDialog.showModal();
  });
  document.getElementById("closeDialog").addEventListener("click", () => memoryDialog.close());
  memoryDialog.addEventListener("click", (event) => {
    if (event.target === memoryDialog) memoryDialog.close();
  });
}

applyContent();
renderMemories();
renderPetals();
setupRevealObserver();
setupMemoryDialog();

document.getElementById("lightButton").addEventListener("click", openPage);
document.getElementById("revealLine").addEventListener("click", revealHiddenLine);
document.getElementById("lanternButton").addEventListener("click", releaseLantern);
