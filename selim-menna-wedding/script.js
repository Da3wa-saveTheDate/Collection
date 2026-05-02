// Preloader
(function () {
  var pre = document.getElementById('preloader');
  if (!pre) return;
  setTimeout(function () { pre.classList.add('fading'); }, 1800);
  setTimeout(function () { pre.classList.add('hidden'); }, 2600);
})();

// Countdown
(function () {
  var TARGET = new Date('2026-05-07T18:00:00').getTime();
  var nodes = document.querySelectorAll('#countdown .cd-num');
  if (!nodes.length) return;

  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    var diff = Math.max(0, TARGET - Date.now());
    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff / 3600000) % 24);
    var m = Math.floor((diff / 60000) % 60);
    var s = Math.floor((diff / 1000) % 60);
    var map = { days: d, hours: h, minutes: m, seconds: s };
    nodes.forEach(function (el) {
      var k = el.getAttribute('data-k');
      el.textContent = pad(map[k]);
    });
  }
  tick();
  setInterval(tick, 1000);
})();

// Reveal on scroll
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(function (el) { io.observe(el); });
})();

// Playlist form
(function () {
  var form = document.getElementById('playlist-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var input = form.elements.namedItem('song');
    if (input && input.value) {
      alert('Thanks for suggesting: ' + input.value);
      input.value = '';
    }
  });
})();
