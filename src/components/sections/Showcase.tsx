import { useState } from 'react';
import { ArrowRight, Eye } from 'lucide-react';

const templates = [
  // === Wedding Templates (with /images/ folder) ===
  {
    id: 'celestial-love',
    title: 'Celestial Love',
    category: 'wedding',
    description: 'A heavenly design featuring soft starlight and ethereal elegance for romantic unions.',
    image: '/celestial-love/images/hero.png'
  },
  {
    id: 'desert-rose',
    title: 'Desert Rose',
    category: 'wedding',
    description: 'Warm terracotta tones and organic shapes inspired by breathtaking desert sunsets.',
    image: '/desert-rose/images/hero.jpg'
  },
  {
    id: 'emerald-noir',
    title: 'Emerald Noir',
    category: 'wedding',
    description: 'Deep, luxurious greens paired with gold accents for a highly sophisticated atmosphere.',
    image: '/emerald-noir/images/hero.png'
  },
  {
    id: 'cherry-blossom',
    title: 'Cherry Blossom',
    category: 'wedding',
    description: 'Delicate pinks and floral motifs bringing a sense of spring and new beginnings.',
    image: '/cherry-blossom/images/hero.png'
  },
  {
    id: 'midnight-garden',
    title: 'Midnight Garden',
    category: 'wedding',
    description: 'Dark, romantic floral aesthetics with a mysterious and enchanting vibe.',
    image: '/midnight-garden/images/hero.png'
  },
  {
    id: 'royal-blue',
    title: 'Royal Blue',
    category: 'wedding',
    description: 'Classic, regal navy blue with silver foil accents for a timeless celebration.',
    image: '/royal-blue/images/hero.jpg'
  },
  {
    id: 'coral-sunset',
    title: 'Coral Sunset',
    category: 'wedding',
    description: 'Vibrant coral hues blending into golden sunlight for a warm, joyful celebration.',
    image: '/coral-sunset/images/hero.png'
  },
  {
    id: 'olive-sage',
    title: 'Olive & Sage',
    category: 'wedding',
    description: 'Earthy olive greens and soft sage tones for a natural, organic wedding aesthetic.',
    image: '/olive-sage/images/hero.png'
  },
  {
    id: 'velvet-theatre',
    title: 'Velvet Theatre',
    category: 'wedding',
    description: 'Rich velvet textures and dramatic curtain-inspired layouts for a grand affair.',
    image: '/velvet-theatre/images/hero.jpg'
  },

  // === Wedding Templates (custom image paths) ===
  {
    id: 'adamfarah12',
    title: 'Adam & Farah',
    category: 'wedding',
    description: 'A charming hand-sketched wedding invitation with elegant illustrations and warm touches.',
    image: '/adamfarah12/assets/venue.jpg'
  },
  {
    id: 'ahmedlaila',
    title: 'Ahmed & Laila',
    category: 'wedding',
    description: 'A refined couple portrait invitation with elegant typography and romantic imagery.',
    image: '/ahmedlaila/assets/couple-1.jpg'
  },
  {
    id: 'anas-nada-wedding',
    title: 'Anas & Nada',
    category: 'wedding',
    description: 'A beautiful floral-themed wedding invitation with delicate botanical elements.',
    image: '/anas-nada-wedding/assets/floral-left-DUmRTXW6.png'
  },
  {
    id: 'elisa-jhon-wedding',
    title: 'Elisa & John',
    category: 'wedding',
    description: 'A whimsical fairy-tale wedding with chandeliers, cupids, and enchanting vintage décor.',
    image: '/elisa-jhon-wedding/assets/hero-chandelier-Cix3RZHl.png'
  },
  {
    id: 'karim-somia',
    title: 'Karim & Somia',
    category: 'wedding',
    description: 'A heartfelt, personal wedding invitation capturing genuine moments of love.',
    image: '/karim-somia/assets/WhatsApp Image 2026-04-29 at 3.03.35 PM.jpeg'
  },
  {
    id: 'mohamed-farah',
    title: 'Mohamed & Farah',
    category: 'wedding',
    description: 'A rich gallery-style invitation showcasing cherished couple memories and favorite moments.',
    image: '/mohamed-farah/assets/couple-hero.png'
  },
  {
    id: 'omar-laila',
    title: 'Omar & Laila',
    category: 'wedding',
    description: 'A romantic Egyptian-themed invitation with hand-drawn sketches and warm golden tones.',
    image: '/omar-laila/assets/hero-couple.jpg'
  },
  {
    id: 'omarlayla',
    title: 'Omar & Layla',
    category: 'wedding',
    description: 'A cinematic travel-inspired wedding invitation with stunning sunset photography.',
    image: '/omarlayla/assets/hero-bg.jpg'
  },
  {
    id: 'selim-menna-wedding',
    title: 'Selim & Menna',
    category: 'wedding',
    description: 'An intimate, joyful wedding invitation featuring candid couple photography.',
    image: '/selim-menna-wedding/assets/hero-couple.jpg'
  },
  {
    id: 'yassersalma',
    title: 'Yasser & Salma',
    category: 'wedding',
    description: 'An elegant floral-decorated invitation with a classic envelope reveal and warm feel.',
    image: '/yassersalma/assets/envelope.jpg'
  },
  {
    id: 'zeyad-lara-wedd',
    title: 'Zeyad & Lara',
    category: 'wedding',
    description: 'A nature-inspired mountain wedding invitation with artistic illustrations and birds.',
    image: '/zeyad-lara-wedd/assets/couple-hero-BGsiXew5.jpg'
  },

  // === Engagement ===
  {
    id: 'maya-youssef-engagement',
    title: 'Maya & Youssef',
    category: 'engagement',
    description: 'A celebratory engagement invitation with festive imagery and elegant styling.',
    image: '/maya-youssef-engagement/assets/fake-hero.png'
  },

  // === Birthday Templates ===
  {
    id: 'birthday-arcade',
    title: 'Arcade Party',
    category: 'birthday',
    description: 'A fun, retro arcade-themed birthday invitation packed with vibrant pixel art energy.',
    image: '/birthday-arcade/assets/hero.png'
  },
  {
    id: 'birthday-cosmic-gift',
    title: 'Cosmic Gift',
    category: 'birthday',
    description: 'A space-themed birthday celebration with cosmic colors and stellar animations.',
    image: null
  },
  {
    id: 'birthday-romantic-gift',
    title: 'Romantic Gift',
    category: 'birthday',
    description: 'A sweet, romantic birthday gift invitation with soft pastels and heartfelt touches.',
    image: null
  },
  {
    id: 'birthday-serenade',
    title: 'Birthday Serenade',
    category: 'birthday',
    description: 'A musical birthday celebration with warm moments and melodic vibes.',
    image: '/birthday-serenade/assets/hero.png'
  },
  {
    id: 'birthday-starfall',
    title: 'Starfall',
    category: 'birthday',
    description: 'A dazzling starfall-themed birthday with shimmering effects and celestial wonder.',
    image: null
  },
  {
    id: 'birthday-time-capsule',
    title: 'Time Capsule',
    category: 'birthday',
    description: 'A nostalgic time-capsule birthday experience with curated memories through the years.',
    image: '/birthday-time-capsule/assets/hero.png'
  },
  {
    id: 'birthday-wish',
    title: 'Birthday Wish',
    category: 'birthday',
    description: 'A heartfelt birthday wish invitation filled with cherished photo memories.',
    image: '/birthday-wish/assets/hero.png'
  },
];

const categories = [
  { key: 'all', label: 'All' },
  { key: 'wedding', label: 'Weddings' },
  { key: 'engagement', label: 'Engagements' },
  { key: 'birthday', label: 'Birthdays' },
];

const INITIAL_COUNT = 6;

export default function Showcase() {
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  const visibleTemplates = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = filtered.length > INITIAL_COUNT && !showAll;

  return (
    <section id="designs" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-10 reveal-on-scroll">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">Our Signature Collection</h2>
          <p className="text-lg text-brand-dark/70 font-light">
            Discover our meticulously crafted digital invitations. Each template is fully customizable to perfectly match your vision.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-14 flex-wrap reveal-on-scroll">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setShowAll(false); }}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-brand-dark text-white'
                  : 'bg-brand-light text-brand-dark/70 hover:bg-brand-dark/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleTemplates.map((template, index) => (
            <div 
              key={template.id} 
              className="group rounded-[2rem] bg-brand-light p-6 transition-all duration-500 hover:shadow-xl reveal-on-scroll"
              style={{ transitionDelay: `${(index % 3) * 100}ms` }}
            >
              {/* Mockup Container */}
              <div className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6 bg-white shadow-sm">
                {template.image ? (
                  <img 
                    src={`${import.meta.env.BASE_URL}${template.image.replace(/^\//, '')}`} 
                    alt={template.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-accent/20 to-brand-dark/10">
                    <span className="font-serif text-2xl text-brand-dark/30">{template.title}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <a 
                    href={`${import.meta.env.BASE_URL}${template.id}/index.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/40 text-white p-4 rounded-full backdrop-blur-md transition-colors"
                  >
                    <Eye className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-serif text-brand-dark">{template.title}</h3>
                  <span className="text-[10px] uppercase tracking-widest text-brand-dark/40 font-medium px-2 py-0.5 rounded-full border border-brand-dark/10">
                    {template.category}
                  </span>
                </div>
                <p className="text-brand-dark/60 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {template.description}
                </p>
                
                <a 
                  href={`${import.meta.env.BASE_URL}${template.id}/index.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand-dark group/btn"
                >
                  Try Demo
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {hasMore && (
          <div className="mt-16 text-center reveal-on-scroll">
            <button 
              onClick={() => setShowAll(true)}
              className="bg-transparent border border-brand-dark text-brand-dark px-8 py-4 rounded-full font-medium hover:bg-brand-dark hover:text-white transition-all cursor-pointer"
            >
              View All Designs ({filtered.length - INITIAL_COUNT} more)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
