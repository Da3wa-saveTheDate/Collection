/* =========================================================
   Omar & Laila — Wedding Invitation (vanilla JS, no React)
   ========================================================= */

const WEDDING_DATE = new Date("2026-05-07T16:00:00");

/* -------- Preloader -------- */
window.addEventListener("load", () => {
  const pre = document.getElementById("preloader");
  if (!pre) return;
  setTimeout(() => pre.classList.add("hide"), 1700);
  setTimeout(() => pre.remove(), 2500);
});

/* -------- Reveal on scroll -------- */
(() => {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
})();

/* -------- Calendar (May 2026, starts Friday) -------- */
(() => {
  const grid = document.getElementById("calendar-grid");
  if (!grid) return;
  const blanks = 4; // Mon..Thu before Friday May 1
  for (let i = 0; i < blanks; i++) {
    const d = document.createElement("div");
    grid.appendChild(d);
  }
  for (let d = 1; d <= 31; d++) {
    const cell = document.createElement("div");
    cell.className = "day" + (d === 7 ? " is-wedding" : "");
    const span = document.createElement("span");
    span.className = "num";
    span.textContent = d;
    cell.appendChild(span);
    grid.appendChild(cell);
  }
})();

/* -------- Timeline -------- */
(() => {
  const list = document.getElementById("timeline-list");
  if (!list) return;

  const heart = `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>`;
  const rings = `<svg class="icon-svg-rings" viewBox="0 0 64 40" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><circle cx="22" cy="22" r="14"/><circle cx="40" cy="22" r="14"/><path d="M28 6 l2 -3 l2 3 l-2 1 z" fill="currentColor"/></svg>`;
  const plate = `<svg class="icon-svg-plate" viewBox="0 0 64 40" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><ellipse cx="32" cy="22" rx="18" ry="10"/><ellipse cx="32" cy="22" rx="11" ry="6"/><line x1="14" y1="14" x2="10" y2="6"/><line x1="50" y1="14" x2="54" y2="6"/></svg>`;
  const cake = `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3M12 8v3M17 8v3"/><path d="M7 4h.01M12 4h.01M17 4h.01"/></svg>`;
  const wine = `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 22h8M12 15v7"/><path d="M17 2H7l1 8a4 4 0 1 0 8 0Z"/></svg>`;
  const flower = `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5a3 3 0 1 1 3 3"/><path d="M12 5a3 3 0 1 0-3 3"/><path d="M8 8a3 3 0 1 0 0 6"/><path d="M16 8a3 3 0 1 1 0 6"/><path d="M9 14a3 3 0 1 0 3 3"/><path d="M15 14a3 3 0 1 1-3 3"/><circle cx="12" cy="11" r="2"/><path d="M12 17v5"/></svg>`;

  const events = [
    { time: "16:00", label: "Guest Arrival", note: "Welcome drinks", icon: heart },
    { time: "17:00", label: "Ceremony",      note: "The vows",       icon: rings },
    { time: "19:00", label: "Wedding Dinner",note: "Seated meal",    icon: plate },
    { time: "21:30", label: "Cake & Toast",  note: "Sweet moments",  icon: cake },
    { time: "22:00", label: "Party",         note: "Dance the night",icon: wine },
    { time: "01:00", label: "Conclusion",    note: "Farewell",       icon: flower },
  ];

  events.forEach((e, idx) => {
    const left = idx % 2 === 0;
    const li = document.createElement("li");
    li.className = "timeline-row";
    li.innerHTML = `
      <div class="timeline-side right ${left ? "" : "empty"}">
        ${left ? `<p class="time">${e.time}</p><p class="label">${e.label}</p><p class="note">${e.note}</p>` : ""}
      </div>
      <div class="timeline-center">
        <span class="timeline-dot" aria-hidden="true"></span>
        <div class="timeline-icon-wrap">${e.icon}</div>
      </div>
      <div class="timeline-side left ${!left ? "" : "empty"}">
        ${!left ? `<p class="time">${e.time}</p><p class="label">${e.label}</p><p class="note">${e.note}</p>` : ""}
      </div>
    `;
    list.appendChild(li);
  });
})();

/* -------- Countdown -------- */
(() => {
  const map = {
    days: document.querySelector('[data-cd="days"]'),
    hours: document.querySelector('[data-cd="hours"]'),
    minutes: document.querySelector('[data-cd="minutes"]'),
    seconds: document.querySelector('[data-cd="seconds"]'),
  };
  if (!map.days) return;
  const pad = (n) => String(n).padStart(2, "0");
  const tick = () => {
    const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
    map.days.textContent    = pad(Math.floor(diff / 86400000));
    map.hours.textContent   = pad(Math.floor((diff / 3600000) % 24));
    map.minutes.textContent = pad(Math.floor((diff / 60000) % 60));
    map.seconds.textContent = pad(Math.floor((diff / 1000) % 60));
  };
  tick();
  setInterval(tick, 1000);
})();

/* -------- RSVP -------- */
(() => {
  const form = document.getElementById("rsvp-form");
  const thanks = document.getElementById("rsvp-thanks");
  if (!form || !thanks) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const att = data.get("att");
    if (!name || !att) return;
    form.style.display = "none";
    thanks.style.display = "block";
  });
})();

/* -------- Voice player -------- */
(() => {
  const audio = document.getElementById("voice-audio");
  const btn   = document.getElementById("voice-toggle");
  const iconPlay  = document.getElementById("voice-icon-play");
  const iconPause = document.getElementById("voice-icon-pause");
  const wave  = document.getElementById("waveform");
  const cur   = document.getElementById("voice-cur");
  const dur   = document.getElementById("voice-dur");
  if (!audio || !btn || !wave) return;

  // Build deterministic waveform bars
  const BAR_COUNT = 36;
  const bars = [];
  for (let i = 0; i < BAR_COUNT; i++) {
    const h = Math.min(100, Math.max(20, Math.round(30 + Math.abs(Math.sin(i * 1.7) * 60) + (i % 5) * 4)));
    const span = document.createElement("span");
    span.className = "bar";
    span.style.height = h + "%";
    wave.appendChild(span);
    bars.push(span);
  }

  const fmt = (s) => {
    if (!isFinite(s) || s <= 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  const setProgress = (p) => {
    const cutoff = (p / 100) * bars.length;
    bars.forEach((b, i) => b.classList.toggle("active", i < cutoff));
  };

  btn.addEventListener("click", () => {
    if (audio.paused) audio.play(); else audio.pause();
  });
  audio.addEventListener("play", () => {
    iconPlay.style.display = "none";
    iconPause.style.display = "";
    btn.setAttribute("aria-label", "Pause message");
  });
  audio.addEventListener("pause", () => {
    iconPlay.style.display = "";
    iconPause.style.display = "none";
    btn.setAttribute("aria-label", "Play message");
  });
  audio.addEventListener("ended", () => {
    setProgress(0);
    cur.textContent = "0:00";
  });
  audio.addEventListener("loadedmetadata", () => {
    dur.textContent = fmt(audio.duration);
  });
  audio.addEventListener("timeupdate", () => {
    cur.textContent = fmt(audio.currentTime);
    if (audio.duration > 0) setProgress((audio.currentTime / audio.duration) * 100);
  });
})();
