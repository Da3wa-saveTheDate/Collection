const capsuleData = {
  birthdayName: "Nadia",
  madeBy: "Your favorite people",
  sealedDate: "May 25, 2026",
  heroMini: "For Nadia's birthday",
  heroTitle: "Open today. Keep forever.",
  heroText: "A digital birthday time capsule full of tiny notes, old memories, and one message for the year ahead.",
  footerLine: "Capsule sealed with love.",
  capsules: [
    "The laugh nobody can copy",
    "That one golden-hour day",
    "Proof you make rooms brighter",
    "A little chaos, in the best way",
    "The photo we always come back to",
    "A tiny win worth saving",
    "The calm after a long week",
    "Birthday energy, archived",
    "A memory with main-character lighting",
    "The softest reminder",
    "The group favorite",
    "Keep this one close"
  ],
  wishes: [
    { from: "From us", text: "May this year be gentler than expected and brighter than planned." },
    { from: "From future you", text: "You did not miss your moment. You were becoming ready for it." },
    { from: "From the archive", text: "Keep every version of yourself that helped you get here." }
  ],
  futureNotes: [
    "You have already handled things you once thought would be too much. Keep choosing joy loudly.",
    "A slow season is still a season. Grow at the speed that keeps you whole.",
    "The best parts of this year may still be unnamed. Leave room for them.",
    "You are allowed to want more, rest more, laugh more, and change your mind."
  ]
};

const unlock = document.getElementById("unlock");
const page = document.getElementById("page");
const burstLayer = document.getElementById("burstLayer");
const dialog = document.getElementById("memoryDialog");
let futureIndex = 0;

function applyContent() {
  document.title = `${capsuleData.birthdayName} Birthday Time Capsule`;
  document.getElementById("heroMini").textContent = capsuleData.heroMini;
  document.getElementById("heroTitle").textContent = capsuleData.heroTitle;
  document.getElementById("heroText").textContent = capsuleData.heroText;
  document.getElementById("sealedDate").textContent = capsuleData.sealedDate;
  document.getElementById("birthdayName").textContent = capsuleData.birthdayName;
  document.getElementById("madeBy").textContent = capsuleData.madeBy;
  document.getElementById("futureMessage").textContent = capsuleData.futureNotes[0];
  document.getElementById("footerLine").textContent = capsuleData.footerLine;
}

function renderCapsules() {
  const grid = document.getElementById("capsuleGrid");
  grid.innerHTML = "";
  capsuleData.capsules.forEach((title, index) => {
    const button = document.createElement("button");
    button.className = "capsule";
    button.type = "button";
    button.dataset.index = String(index);
    button.innerHTML = `
      <img src="assets/capsule-${String(index + 1).padStart(2, "0")}.png" alt="${title}">
      <span>${title}</span>
    `;
    grid.appendChild(button);
  });
}

function renderWishes() {
  const list = document.getElementById("wishList");
  list.innerHTML = "";
  capsuleData.wishes.forEach((wish) => {
    const article = document.createElement("article");
    article.className = "wish";
    article.innerHTML = `<p>${wish.text}</p><span>${wish.from}</span>`;
    list.appendChild(article);
  });
}

function revealPage() {
  unlock.classList.add("is-hidden");
  page.classList.add("is-visible");
  page.removeAttribute("aria-hidden");
  document.body.classList.remove("locked");
  burst(82);
}

function burst(amount = 45) {
  const colors = ["#ff6f91", "#ffc759", "#37caaa", "#7052ac", "#5879e8", "#fffaf3"];
  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement("span");
    piece.className = "burst";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * .35}s`;
    piece.style.setProperty("--drift", `${(Math.random() - .5) * 240}px`);
    burstLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 2300);
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

function setupDialog() {
  const image = document.getElementById("dialogImage");
  const label = document.getElementById("dialogLabel");
  const title = document.getElementById("dialogTitle");
  const text = document.getElementById("dialogText");

  document.getElementById("capsuleGrid").addEventListener("click", (event) => {
    const capsule = event.target.closest(".capsule");
    if (!capsule) return;
    const index = Number(capsule.dataset.index);
    image.src = `assets/capsule-${String(index + 1).padStart(2, "0")}.png`;
    image.alt = capsuleData.capsules[index];
    label.textContent = `Capsule ${String(index + 1).padStart(2, "0")}`;
    title.textContent = capsuleData.capsules[index];
    text.textContent = "Replace this placeholder with a real story, private joke, or photo caption for the birthday person.";
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    }
    burst(20);
  });

  document.getElementById("closeDialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function setupFutureNotes() {
  document.getElementById("shuffleFuture").addEventListener("click", () => {
    futureIndex = (futureIndex + 1) % capsuleData.futureNotes.length;
    document.getElementById("futureMessage").textContent = capsuleData.futureNotes[futureIndex];
    burst(28);
  });
}

applyContent();
renderCapsules();
renderWishes();
setupRevealObserver();
setupDialog();
setupFutureNotes();

document.getElementById("unlockButton").addEventListener("click", revealPage);
