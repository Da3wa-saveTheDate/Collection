/* ============================================
   Yasser & Salma — Wedding Invitation
   Native JS (converted from React)
   ============================================ */

// --- Preloader ---
window.addEventListener('load', () => {
  setTimeout(() => {
    const p = document.getElementById('preloader');
    if (p) {
      p.classList.add('hide');
      setTimeout(() => p.remove(), 1000);
    }
  }, 2200);
});

// --- Reveal on scroll (FadeIn equivalent) ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// --- Calendar (October 2026, 19th highlighted) ---
function buildCalendar() {
  const container = document.getElementById('calendar');
  if (!container) return;
  const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const FIRST_OFFSET = 4; // Oct 1, 2026 = Thursday
  const DAYS_IN_MONTH = 31;

  const cells = [];
  for (let i = 0; i < FIRST_OFFSET; i++) cells.push(null);
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  let html = '<div class="calendar-month">OCTOBER · 2026</div>';
  html += '<div class="calendar-grid">';
  DAYS.forEach((d) => { html += `<div class="calendar-dow">${d}</div>`; });
  cells.forEach((c) => {
    if (c === 19) {
      html += `<div class="calendar-day"><span class="calendar-day-highlight">${c}</span></div>`;
    } else if (c) {
      html += `<div class="calendar-day"><span>${c}</span></div>`;
    } else {
      html += '<div class="calendar-day"></div>';
    }
  });
  html += '</div>';
  container.innerHTML = html;
}
buildCalendar();

// --- Countdown ---
const TARGET = new Date('2026-10-19T17:30:00').getTime();
function buildCountdown() {
  const root = document.getElementById('countdown');
  if (!root) return;
  root.innerHTML = `
    <div class="countdown-unit"><div class="countdown-value" data-key="days">00</div><div class="countdown-label">DAYS</div></div>
    <span class="countdown-sep">:</span>
    <div class="countdown-unit"><div class="countdown-value" data-key="hours">00</div><div class="countdown-label">HOURS</div></div>
    <span class="countdown-sep">:</span>
    <div class="countdown-unit"><div class="countdown-value" data-key="minutes">00</div><div class="countdown-label">MINUTES</div></div>
    <span class="countdown-sep">:</span>
    <div class="countdown-unit"><div class="countdown-value" data-key="seconds">00</div><div class="countdown-label">SECONDS</div></div>
  `;
  function tick() {
    const diff = Math.max(0, TARGET - Date.now());
    const t = {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
    root.querySelectorAll('.countdown-value').forEach((el) => {
      const k = el.getAttribute('data-key');
      el.textContent = String(t[k]).padStart(2, '0');
    });
  }
  tick();
  setInterval(tick, 1000);
}
buildCountdown();

// --- Audio players ---
document.querySelectorAll('.audio-player').forEach((player) => {
  const src = player.getAttribute('data-src');
  if (!src) return;
  const audio = new Audio(src);
  audio.preload = 'none';

  const mainBtn = player.querySelector('.audio-main');
  const bar = player.querySelector('.audio-progress-bar');
  let playing = false;

  mainBtn.addEventListener('click', () => {
    // Pause any other players
    document.querySelectorAll('.audio-player').forEach((other) => {
      if (other !== player && other._audio && !other._audio.paused) {
        other._audio.pause();
        const otherBtn = other.querySelector('.audio-main');
        if (otherBtn) otherBtn.textContent = '▶';
      }
    });
    if (playing) {
      audio.pause();
      playing = false;
      mainBtn.textContent = '▶';
    } else {
      audio.play().catch(() => {});
      playing = true;
      mainBtn.textContent = '❚❚';
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      bar.style.width = ((audio.currentTime / audio.duration) * 100) + '%';
    }
  });
  audio.addEventListener('ended', () => {
    playing = false;
    mainBtn.textContent = '▶';
    bar.style.width = '0%';
  });
  player._audio = audio;
});

// --- RSVP ---
const rsvpBtn = document.getElementById('rsvp-btn');
const rsvpToast = document.getElementById('rsvp-toast');
if (rsvpBtn) {
  rsvpBtn.addEventListener('click', () => {
    rsvpBtn.disabled = true;
    rsvpBtn.textContent = '✓ ATTENDANCE CONFIRMED';
    if (rsvpToast) rsvpToast.classList.add('show');
  });
}
