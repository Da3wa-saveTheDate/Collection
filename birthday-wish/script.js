const invitation = {
  birthdayName: "Maya",
  senderName: "Leen",
  date: "June 18, 2026",
  themeName: "Soft confetti glow",
  eyebrow: "A private birthday invitation",
  subtitle: "Hey you know who, this one is all yours.",
  letter: "Today is a small excuse to say the big things out loud. You are kind in ways that stay with people, funny in the exact moments everyone needs it, and somehow able to make normal days feel like a scene worth remembering. I hope this year brings you gentleness, wild good news, and the kind of joy that follows you home.",
  secret: "You make ordinary days feel like celebrations.",
  song: {
    title: "Golden Hour Wish",
    label: "Birthday song",
    note: "Press play for a soft demo ambience, or replace it with a real song file in the settings.",
    file: ""
  },
  finalWish: "Candles are lit. Make the wish dramatic.",
  colors: {
    rose: "#ff7b9c",
    violet: "#7a5cff",
    mint: "#31c7a0",
    gold: "#f2bb47",
    coral: "#ff8c62"
  },
  photos: Array.from({ length: 22 }, (_, index) => ({
    src: `assets/memory-${String(index + 1).padStart(2, "0")}.png`,
    caption: `Memory ${String(index + 1).padStart(2, "0")}`
  }))
};

const gate = document.getElementById("gate");
const siteShell = document.getElementById("siteShell");
const openInvitation = document.getElementById("openInvitation");
const confettiLayer = document.getElementById("confettiLayer");
const toast = document.getElementById("toast");
const birthdaySong = document.getElementById("birthdaySong");
const playSong = document.getElementById("playSong");
const trackProgress = document.getElementById("trackProgress");

let audioContext;
let ambienceNodes = [];
let ambienceTimer;
let toastTimer;
let progressTimer;
let syntheticProgress = 0;
let isSyntheticPlaying = false;

function applyInvitationContent() {
  document.title = `${invitation.birthdayName} Birthday Invitation`;
  document.documentElement.style.setProperty("--rose", invitation.colors.rose);
  document.documentElement.style.setProperty("--violet", invitation.colors.violet);
  document.documentElement.style.setProperty("--mint", invitation.colors.mint);
  document.documentElement.style.setProperty("--gold", invitation.colors.gold);
  document.documentElement.style.setProperty("--coral", invitation.colors.coral);

  document.getElementById("heroEyebrow").textContent = invitation.eyebrow;
  document.getElementById("heroTitle").textContent = `Happy Birthday ${invitation.birthdayName}`;
  document.getElementById("heroSubtitle").textContent = invitation.subtitle;
  document.getElementById("birthdayDate").textContent = invitation.date;
  document.getElementById("senderName").textContent = invitation.senderName;
  document.getElementById("themeName").textContent = invitation.themeName;
  document.getElementById("letterText").textContent = invitation.letter;
  document.getElementById("secretBody").textContent = invitation.secret;
  document.getElementById("songTitle").textContent = invitation.song.title;
  document.getElementById("songNote").textContent = invitation.song.note;
  document.getElementById("trackLabel").textContent = invitation.song.label;
  document.getElementById("footerText").textContent = `Made with love for ${invitation.birthdayName}.`;

  if (invitation.song.file) {
    birthdaySong.src = invitation.song.file;
  }
}

function renderGallery() {
  const galleryGrid = document.getElementById("galleryGrid");
  galleryGrid.innerHTML = "";
  invitation.photos.slice(0, 22).forEach((photo, index) => {
    const button = document.createElement("button");
    button.className = "memory";
    button.type = "button";
    button.dataset.index = String(index);
    button.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption}">
      <span>${photo.caption}</span>
    `;
    galleryGrid.appendChild(button);
  });
}

function openSite() {
  gate.classList.add("is-open");
  burstConfetti(90);
  setTimeout(() => {
    gate.classList.add("is-hidden");
    siteShell.classList.add("is-visible");
    siteShell.removeAttribute("aria-hidden");
    document.body.classList.remove("locked");
  }, 1050);
}

function burstConfetti(count = 48) {
  const colors = [invitation.colors.rose, invitation.colors.violet, invitation.colors.mint, invitation.colors.gold, invitation.colors.coral, "#ffffff"];
  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * .35}s`;
    piece.style.setProperty("--drift", `${(Math.random() - .5) * 260}px`);
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 2300);
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
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

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeLightbox = document.getElementById("closeLightbox");

  document.getElementById("galleryGrid").addEventListener("click", (event) => {
    const item = event.target.closest(".memory");
    if (!item) return;

    const photo = invitation.photos[Number(item.dataset.index)];
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.caption;
    lightboxCaption.textContent = photo.caption;
    if (typeof lightbox.showModal === "function") {
      lightbox.showModal();
    } else {
      showToast(photo.caption);
    }
  });

  closeLightbox.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}

function startSyntheticAmbience() {
  audioContext = audioContext || new AudioContext();
  const master = audioContext.createGain();
  master.gain.value = .045;
  master.connect(audioContext.destination);

  const notes = [261.63, 329.63, 392, 523.25];
  ambienceNodes = notes.map((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = index % 2 === 0 ? "sine" : "triangle";
    oscillator.frequency.value = frequency;
    gain.gain.value = .16 / (index + 1);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start();
    return { oscillator, gain, master };
  });

  ambienceTimer = window.setInterval(() => {
    const now = audioContext.currentTime;
    ambienceNodes.forEach(({ oscillator }, index) => {
      const next = notes[(index + Math.floor(Math.random() * notes.length)) % notes.length];
      oscillator.frequency.setTargetAtTime(next, now, .08);
    });
  }, 900);
}

function stopSyntheticAmbience() {
  window.clearInterval(ambienceTimer);
  ambienceNodes.forEach(({ oscillator, gain, master }) => {
    gain.gain.setTargetAtTime(0, audioContext.currentTime, .04);
    window.setTimeout(() => {
      oscillator.stop();
      oscillator.disconnect();
      gain.disconnect();
      master.disconnect();
    }, 220);
  });
  ambienceNodes = [];
}

function setPlayingState(isPlaying) {
  playSong.classList.toggle("is-playing", isPlaying);
  playSong.setAttribute("aria-label", isPlaying ? "Pause birthday song" : "Play birthday song");
}

function startProgressLoop() {
  window.clearInterval(progressTimer);
  progressTimer = window.setInterval(() => {
    if (invitation.song.file && birthdaySong.duration) {
      trackProgress.style.width = `${Math.min(100, (birthdaySong.currentTime / birthdaySong.duration) * 100)}%`;
      return;
    }
    if (isSyntheticPlaying) {
      syntheticProgress = (syntheticProgress + 1.2) % 100;
      trackProgress.style.width = `${syntheticProgress}%`;
    }
  }, 250);
}

async function toggleSong() {
  if (invitation.song.file) {
    if (birthdaySong.paused) {
      await birthdaySong.play();
      setPlayingState(true);
      startProgressLoop();
    } else {
      birthdaySong.pause();
      setPlayingState(false);
    }
    return;
  }

  if (!isSyntheticPlaying) {
    startSyntheticAmbience();
    isSyntheticPlaying = true;
    setPlayingState(true);
    startProgressLoop();
  } else {
    stopSyntheticAmbience();
    isSyntheticPlaying = false;
    setPlayingState(false);
  }
}

function setupSurprises() {
  document.getElementById("quickConfetti").addEventListener("click", () => {
    burstConfetti(58);
    showToast("A little confetti, because subtlety can wait.");
  });

  document.getElementById("secretNote").addEventListener("click", (event) => {
    const note = event.currentTarget;
    const isOpen = note.classList.toggle("is-open");
    note.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".surprise-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.add("is-open");
      card.querySelector("strong").textContent = card.dataset.surprise;
      burstConfetti(22);
    });
  });

  document.getElementById("wishButton").addEventListener("click", () => {
    document.getElementById("wishMessage").textContent = invitation.finalWish;
    burstConfetti(120);
  });
}

applyInvitationContent();
renderGallery();
setupRevealObserver();
setupLightbox();
setupSurprises();

openInvitation.addEventListener("click", openSite);
playSong.addEventListener("click", () => {
  toggleSong().catch(() => showToast("Audio needs one more tap to start."));
});
birthdaySong.addEventListener("ended", () => {
  setPlayingState(false);
  trackProgress.style.width = "0%";
});
