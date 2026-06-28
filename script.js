// Loader
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 1400);
});

// Particles
(function(){
  const wrap = document.getElementById('particles');
  for (let i = 0; i < 40; i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random()*100 + '%';
    p.style.bottom = '-10px';
    p.style.animationDuration = (12 + Math.random()*18) + 's';
    p.style.animationDelay = (Math.random()*10) + 's';
    p.style.transform = `scale(${0.5 + Math.random()*1.5})`;
    wrap.appendChild(p);
  }
})();

// Navbar scrolled
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu.querySelectorAll('a');

function toggleMenu(){
  menuToggle.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', () => {
  menuToggle.classList.remove('active');
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
}));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('shown'); io.unobserve(e.target); }});
}, { threshold: 0.12 });
function observeReveals() {
  document.querySelectorAll('.reveal').forEach(el => {
    if (!el.classList.contains('shown')) {
      io.observe(el);
    }
  });
}
observeReveals();

// Language toggle
const langBtn = document.getElementById('langToggle');
let lang = 'en';
function applyLang(l){
  lang = l;
  document.documentElement.lang = l;
  document.body.dir = l === 'ar' ? 'rtl' : 'ltr';
  langBtn.textContent = l === 'ar' ? 'EN' : 'AR';
  document.querySelectorAll('[data-en]').forEach(el => {
    const v = el.getAttribute(l === 'ar' ? 'data-ar' : 'data-en');
    if (v){
      // Preserve span.shimmer/text-gold wrapper if exists
      const span = el.querySelector('span');
      if (span && (span.classList.contains('shimmer') || span.classList.contains('text-gold'))){
        span.textContent = v;
      } else {
        el.textContent = v;
      }
    }
  });
  renderTemplates();
  renderWhy();
  renderProcess();
  renderTestimonials();
  observeReveals();
}
langBtn.addEventListener('click', () => applyLang(lang === 'en' ? 'ar' : 'en'));

// Theme toggle
const themeBtn = document.getElementById('themeToggle');
let theme = localStorage.getItem('theme') || 'light';

function applyTheme(t) {
  theme = t;
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);

  // Hero dark background images
  const heroBgDesktop = document.querySelector('.hero-dark-bg--desktop');
  const heroBgMobile  = document.querySelector('.hero-dark-bg--mobile');
  const isMobile = window.innerWidth <= 639;
  if (heroBgDesktop) heroBgDesktop.style.display = (t === 'dark' && !isMobile) ? 'block' : 'none';
  if (heroBgMobile)  heroBgMobile.style.display  = (t === 'dark' && isMobile)  ? 'block' : 'none';

  const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="moon-icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sun-icon"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  if (themeBtn) {
    themeBtn.innerHTML = t === 'dark' ? sunIcon : moonIcon;
  }
}

applyTheme(theme);
if (themeBtn) {
  themeBtn.addEventListener('click', () => applyTheme(theme === 'light' ? 'dark' : 'light'));
}

// Templates
const standardTemplates = [
  {
    img:'inv6-new.png', link: 'demos/Mohamed-Farah/index.html',
    en:{ name:'Mohamed & Farah', style:'Polaroid Love', desc:'Fun, warm & full of personality. Perfect for young couples who want their invitation to feel alive, playful, and a little unforgettable.' },
    ar:{ name:'محمد & فرح', style:'بولارويد', desc:'شيك ومختلف ومضحك بطريقة حلوة. الأنسب للعرسان الصغيرين اللي عايزين دعوتهم تبقى مميزة وخفيفة على القلب.' }
  },
  {
    img:'inv3-new.png', link: 'demos/adamfarah12/index.html',
    en:{ name:'Adam & Farah', style:'Playful Blush', desc:'A modern, funky vibe with individual portraits and a totally different layout. Made for couples who dare to stand out.' },
    ar:{ name:'آدم & فرح', style:'مرح وردي', desc:'ستايل فانكي ومودرن، صورة كل واحد لوحده وتصميم مختلف خالص. للعرسان الجريئين اللي مش عايزين حاجة تقليدية.' }
  },
  {
    img:'inv2-new.png', link: 'demos/ahmedlaila/index.html',
    en:{ name:'Ahmed & Laila', style:'Crimson Classic', desc:'Refined, calm, and beautifully simple. For couples who prefer elegance with no excess — just pure, clean sophistication.' },
    ar:{ name:'أحمد & ليلى', style:'كلاسيكي قرمزي', desc:'شيك وهادي من غير أي زحمة. للناس اللي بتحب البساطة الراقية وما تحتاجش كتير عشان تبهر.' }
  },
  {
    img:'inv12-new.png', link: 'demos/Yonis-Assel-Ar/index.html',
    en:{ name:'Yonis & Assel', style:'Arabesque Cinematic', desc:'Our best-selling Arabic template. Elegant, calm, and cinematic with an Eastern soul that feels right at home with our traditions.' },
    ar:{ name:'يونس & آسيل', style:'سينمائي أرابيسك', desc:'الأكتر مبيعاً في المجموعة. تمبليت عربي أصيل وهادي بلمسة شرقية تليق بعاداتنا وتعبر عن فرحتنا.' }
  },
  {
    img:'inv11-new.png', link: 'demos/Michael-Natalia/index.html',
    en:{ name:'Michael & Natalia', style:'Royal Elegance', desc:'Sleek, minimal, and seriously elegant. The stunning preloader sets it apart — ideal for couples who want beauty without noise.' },
    ar:{ name:'مايكل & ناتاليا', style:'أناقة ملكية', desc:'هادي وشيك جداً وجميل. اللي بيميزه الـ preloader الرائع اللي في البداية — مثالي لمن يفضل الجمال الهادي.' }
  },
  {
    img:'inv7-new.png', link: 'demos/omarlail/index.html',
    en:{ name:'Omar & Laila', style:'Hand Drawn', desc:'The simplest, most minimal template in the collection. No extra styling, no clutter — pure simplicity for those who love clean design.' },
    ar:{ name:'عمر & ليلى', style:'خط اليد', desc:'أبسط تمبليت في المجموعة. مفيهوش بهرجة ولا زحمة — بساطة خالصة للناس اللي بتحب الـ clean design.' }
  },
  {
    img:'inv1-new.png', link: 'demos/Zein-Malak/index.html',
    en:{ name:'Zain & Malak', style:'Floral Gold', desc:'A graceful Arabic template that beautifully presents every wedding detail in a calm, elegant, and Eastern-inspired style.' },
    ar:{ name:'زين & ملك', style:'ذهبي زهري', desc:'تمبليت عربي أنيق وجميل جداً بيعرض تفاصيل المناسبة بشكل هادي وشرقي يسحر القلب.' }
  },
  {
    img:'inv5-new.png', link: 'demos/laylaomar/index.html',
    en:{ name:'Layla & Omar', style:'Golden Silk', desc:'Designed for couples who love showcasing their photos together. Gorgeous, ultra-refined, and made to impress.' },
    ar:{ name:'ليلى & عمر', style:'حرير ذهبي', desc:'للعرسان اللي عايزين يحطوا صورهم مع بعض. تمبليت جميل وأنيق جداً جداً وبيوصل الإحساس.' }
  },
  {
    img:'inv9-new.png', link: 'demos/SelimMennaWedding/index.html',
    en:{ name:'Selim & Menna', style:'Sunset Shore', desc:'A very different style from everything else — built for couples who love change and want something truly unique.' },
    ar:{ name:'سليم & منة', style:'غروب الشاطئ', desc:'ستايله مختلف جداً عن كل اللي موجودين — للعرسان اللي بيحبوا التغيير ويريدوا حاجة فريدة فعلاً.' }
  },
  {
    img:'inv16-new.png', link: 'demos/Mohamed-Sara/index.html',
    en:{ name:'Mohamed & Sara', style:'Modern Elegant', desc:'A clean, crisp Arabic design with a single harmonious color palette. Perfect for couples who want an elegant bilingual Arabic website.' },
    ar:{ name:'محمد & سارة', style:'أناقة عصرية', desc:'تمبليت نضيف جداً باللغة العربية بلون واحد متناسق. مثالي للناس اللي عايزين موقع عربي شيك وبسيط.' }
  },
];
const premiumTemplates = [
  {
    img:'inv20-new.png', link: 'demos/Mahmoud-Lujain/index.html',
    en:{ name:'Mahmoud & Lujain', style:'Classic Charm', desc:'A stunning and deeply elegant template, tailored for those who appreciate fine details and a sophisticated look for their special day.' },
    ar:{ name:'محمود & لجين', style:'سحر كلاسيكي', desc:'تصميم مذهل وأنيق جداً، مخصص للذين يقدرون التفاصيل الدقيقة والمظهر الراقي في يومهم المميز.' }
  },
  {
    img:'inv13-new.png', link: 'demos/Adam-Rahma/index.html',
    en:{ name:'Adam & Rahma', style:'Sunset Nile', desc:'One of our finest premium templates. Incredibly polished, deeply crafted, and loved by everyone who sees it — truly worth every detail.' },
    ar:{ name:'آدم & رحمة', style:'غروب النيل', desc:'من أجمل التمبليتس البريميوم اللي عندنا. شيك جداً ومتعوب فيه أوي والناس بتحبه بجد — مش هتلاقي زيه.' }
  },
  {
    img:'inv14-new.png', link: 'demos/Omar-Yasmine/index.html',
    en:{ name:'Omar & Yasmine', style:'Serene Script', desc:'Calm, beautiful, and perfect for beach or coastal celebrations. A peaceful elegance that feels like a sunset by the sea.' },
    ar:{ name:'عمر & ياسمين', style:'خط مائل هادئ', desc:'هادي وجميل جداً ومناسب للأفراح على البحر أو في أماكن ساحلية. أناقة ساكنة تشبه غروب الشمس على الماء.' }
  },
  {
    img:'inv15-new.png', link: 'demos/Malek-Fayrozz/index.html',
    en:{ name:'Malek & Fayrozz', style:'Luxury Classic', desc:'Stunning, bold, and breathtaking — perfect for any couple celebrating in a beautiful outdoor venue. Our most requested premium template.' },
    ar:{ name:'مالك & فيروز', style:'كلاسيكي فاخر', desc:'جميل جداً جداً ويليق بأي عرسان في مكان حلو وأوت دور. الأكتر طلباً في الكولكشن البريميوم — وبجدارة.' }
  },
  {
    img:'Henna-new.png', link: 'demos/Maariam/index.html',
    en:{ name:'Henna', style:'Henna Vibes', desc:'The one and only henna-themed template in our entire collection. Playful, funky, and irresistibly charming — made for the bride who wants her invitation to feel as special as the night itself.' },
    ar:{ name:'حنّه', style:'ليلة الحنة', desc:'التمبليت الوحيد في المجموعة كلها اللي معمول على ثيم الحنة. شعبي وفانكي ولذيذ بشكل مش طبيعي — للعروسة اللي عايزة دعوتها تبقى حاجة تانية خالص.' }
  },
];
function generateTemplateCards(templatesArray, tier) {
  const tryLabel  = lang === 'ar' ? 'جرّب الديزاين' : 'Try Demo';
  const isPremium = tier === 'premium';

  return templatesArray.map(t => {
    const d = lang === 'ar' ? t.ar : t.en;
    return `<article class="tpl-card ${isPremium ? 'tpl-card--premium' : 'tpl-card--standard'}">
      <div class="tpl-img">
        <img src="assets/${t.img}" alt="${d.name}" loading="lazy" />
      </div>
      <div class="tpl-body">
        <h3 class="tpl-name">${d.name}</h3>
        <p class="tpl-desc">${d.desc}</p>
        <a href="${t.link}" target="_blank" rel="noopener noreferrer" class="tpl-btn">${tryLabel}</a>
      </div>
    </article>`;
  }).join('');
}
function renderTemplates(){
  const sGrid = document.getElementById('standardTemplatesGrid');
  const pGrid = document.getElementById('premiumTemplatesGrid');
  if (sGrid) sGrid.innerHTML = generateTemplateCards(standardTemplates, 'standard');
  if (pGrid) pGrid.innerHTML = generateTemplateCards(premiumTemplates, 'premium');
}
renderTemplates();

// Device frame
const frames = {
  mobile: () => `<div class="frame-phone"><div class="notch"></div><div class="screen"><img src="assets/preview-mobile-new-new.png" alt="" /></div></div>`,
  tablet: () => `<div class="frame-tablet"><div class="screen"><img src="assets/preview-tablet-new.png" alt="" /></div></div>`,
  desktop: () => `<div class="frame-laptop"><div class="top"><div class="screen"><img src="assets/preview-desktop-new.png" alt="" /></div></div><div class="base"></div></div>`,
};
const frameEl = document.getElementById('deviceFrame');
function setDevice(d){
  document.querySelectorAll('.device-btn').forEach(b => b.classList.toggle('active', b.dataset.device === d));
  frameEl.style.opacity = '0';
  setTimeout(() => { frameEl.innerHTML = frames[d](); frameEl.style.opacity = '1'; }, 200);
}
frameEl.style.transition = 'opacity .4s ease';
frameEl.innerHTML = frames.mobile();
document.querySelectorAll('.device-btn').forEach(b => b.addEventListener('click', () => setDevice(b.dataset.device)));

// Why
const icn1 = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`;
const icn2 = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`;
const icn3 = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 19v-3.96 3.15"/><path d="M7 19h5"/><rect width="6" height="10" x="16" y="12" rx="2"/></svg>`;
const icn4 = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"/><path d="M7 2v20"/><path d="M17 2v20"/><path d="M2 12h20"/><path d="M2 7h5"/><path d="M2 17h5"/><path d="M17 17h5"/><path d="M17 7h5"/></svg>`;
const icn5 = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;

const whyItems = {
  en: [
    {i:icn1,t:'Unique Designs',d:'Custom-made invitations that perfectly match your special story.'},
    {i:icn2,t:'Easy Sharing',d:'Share your joy with family and friends in just one click.'},
    {i:icn3,t:'Works Everywhere',d:'Looks beautiful on phones, tablets, and computers.'},
    {i:icn4,t:'Beautiful Animations',d:'Smooth animations that make your invitation feel alive.'},
    {i:icn5,t:'Lasting Memories',d:'A digital memory you can keep and look back on forever.'},
  ],
  ar: [
    {i:icn1,t:'ديزاينات مفيش زيها',d:'كل دعوة بتتصمم عشان تعكس قصتكم الحلوة.'},
    {i:icn2,t:'تواصل شيك ومختلف',d:'شارك فرحتك بضغطة واحدة وتوصل لقلوب كل حبايبك.'},
    {i:icn3,t:'تجربة متكاملة',d:'شياكة متتوصفش، وشكلها تحفة على كل الشاشات.'},
    {i:icn4,t:'إبداع سينمائي',d:'حركات ولمسات فنية بتعمل تجربة تخطف القلب.'},
    {i:icn5,t:'ذكرى عمرها ما تتنسي',d:'أهم تفاصيلك، محفوظة بشكل يليق بفخامة يومك.'},
  ],
};
function renderWhy(){
  const items = lang === 'ar' ? whyItems.ar : whyItems.en;
  document.getElementById('whyGrid').innerHTML = items.map(it => `
    <div class="why-card">
      <div class="why-icon-box">
        <div class="why-icon">${it.i}</div>
      </div>
      <h3 class="why-title text-gold">${it.t}</h3>
      <p class="why-desc">${it.d}</p>
    </div>`).join('');
}
renderWhy();

// Process
const steps = {
  en: [
    {t:'Choose Your Design',d:'Browse our collection and pick the template that best matches your story and style.'},
    {t:'Contact Us',d:'Send us a message on WhatsApp — we\'ll confirm your booking and get you started right away.'},
    {t:'Fill in Your Details',d:'We\'ll send you a simple form to fill in your event info, photos, colors, and music choice.'},
    {t:'Receive Your Link',d:'Get your final invitation link — ready to share instantly with all your guests.'},
  ],
  ar: [
    {t:'اختار ديزاينك',d:'تصفح مجموعتنا واختار التصميم اللي بيعبر عن قصتكم وستايلكم.'},
    {t:'كلمنا على واتساب',d:'ابعتلنا رسالة على واتساب وهنأكد الحجز ونبدأ مع بعض على طول.'},
    {t:'ابعت التفاصيل',d:'هنبعتلك فورم بسيط تملى فيه بيانات الفرح والصور والألوان والمزيكا.'},
    {t:'استلم دعوتك',d:'احصل على لينك دعوتك النهائي جاهز تبعته لكل ضيوفك في ثانية.'},
  ],
};
function renderProcess(){
  const items = lang === 'ar' ? steps.ar : steps.en;
  const toAr = (n) => n.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  document.getElementById('processGrid').innerHTML =
    `<div class="process-line"></div>` +
    items.map((s,i) => {
      const num = i + 1;
      const displayNum = lang === 'ar' ? toAr(num.toString().padStart(2, '0')) : num.toString().padStart(2, '0');
      return `
      <div class="process-step">
        <div class="process-num">${displayNum}</div>
        <div class="process-content">
          <h3 class="process-title text-gold">${s.t}</h3>
          <p class="process-desc">${s.d}</p>
        </div>
      </div>`;
    }).join('');
}
renderProcess();

// Testimonials
const testimonials = {
  en: [
    {n:'Layla & Ahmed', t:'I really couldn\'t imagine the invitation would be this beautiful. Thank you so much for your taste and effort! ❤️❤️'},
    {n:'Mariam & Omar', t:'The invitation is truly beautiful 🥹 Everyone loved it. Definitely not our last time working together! ❤️❤️❤️'},
    {n:'Nour & Ziad', t:'Thank you so much, the invitation was more than perfect. I am really grateful for this gorgeous design and for your efforts ❤️'},
    {n:'Hana & Seif', t:'Truly the best experience and the most beautiful invitation. Everyone loved it, may your hands be blessed ❤️❤️🥹'},
    {n:'Sarah & Yassin', t:'Thank you for all your hard work with me. The invitation turned out beautiful, thank God ❤️'},
    {n:'Dina & Khaled', t:'The invitation is so beautiful and exactly how I wanted it. Thank you so much for all your hard work ❤️❤️❤️❤️'}
  ],
  ar: [
    {n:'ليلى و أحمد', t:'بجد مكنتش متخيل ان الـ invitation هتبقي حلوه اوي كدا شكرا جدا لذوقكم وتعبكم معانا والله ❤️❤️'},
    {n:'مريم و عمر', t:'بجد الـ invitation حلوه اوي 🥹 عجبت الناس كلها مش اخر تعامل اكيد ان شاء الله ❤️❤️❤️'},
    {n:'نور و زياد', t:'بجد شكراً جداً ليكم، الدعوة كانت أكتر من بيرفكت. أنا مبسوطة جداً بالديزاين التحفة ده ومجهودكم معانا ❤️'},
    {n:'هنا و سيف', t:'بجد احلي تعامل و احلي انفتيشن عجبت كل الناس تسلم ايديكم ❤️❤️🥹'},
    {n:'سارة و ياسين', t:'تسلم تعبك معايا الدعوه طلعت جميله جدا الحمد لله ❤️'},
    {n:'دينا و خالد', t:'الدعوة حلوة جداً وزي ما كنت عاوزة بالظبط. مرسي جداً لتعبك معايا ❤️❤️❤️❤️'}
  ]
};
function renderTestimonials(){
  const items = lang === 'ar' ? testimonials.ar : testimonials.en;
  const verifiedText = lang === 'ar' ? 'رأي عرسان حقيقيين' : 'Verified Couple';
  const starSvg = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
  const stars = starSvg.repeat(5);

  document.getElementById('testimonialsGrid').innerHTML = items.map((it, i) => `
    <div class="testim-card reveal" style="transition-delay: ${i * 0.1}s">
      <div class="testim-stars">${stars}</div>
      <p class="testim-text">"${it.t}"</p>
      <div class="testim-author">
        <div class="testim-avatar">${it.n.charAt(0)}</div>
        <div class="testim-info">
          <h4 class="testim-name">${it.n}</h4>
          <span class="testim-date">${verifiedText}</span>
        </div>
      </div>
      <div class="testim-quote-mark">“</div>
    </div>
  `).join('');
}
renderTestimonials();

// Gallery
const gallery = [
  {src:'gallery1.jpg',cls:'tall'},
  {src:'gallery2.jpg',cls:''},
  {src:'gallery3.jpg',cls:'tall'},
  {src:'gallery4.jpg',cls:''},
  {src:'inv4.png',cls:''},
  {src:'inv5-new.png',cls:'tall'},
];
const galleryGrid = document.getElementById('galleryGrid');
if (galleryGrid) {
  galleryGrid.innerHTML = gallery.map(g => `
    <div class="gallery-item ${g.cls}"><img src="assets/${g.src}" alt="" loading="lazy" /></div>
  `).join('');
}
observeReveals();

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all others
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });
      
      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
