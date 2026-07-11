import { useState, useEffect } from 'react';
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
    title: 'Vintage Sketch',
    category: 'wedding',
    description: 'A charming hand-sketched wedding invitation with elegant illustrations and warm touches.',
    image: '/adamfarah12/images/hero.png'
  },
  {
    id: 'elisa-jhon-wedding',
    title: 'Vintage Fairytale',
    category: 'wedding',
    description: 'A whimsical fairy-tale wedding with chandeliers, cupids, and enchanting vintage décor.',
    image: '/elisa-jhon-wedding/images/hero.png'
  },
  {
    id: 'karim-somia',
    title: 'Heartfelt Moments',
    category: 'wedding',
    description: 'A heartfelt, personal wedding invitation capturing genuine moments of love.',
    image: '/karim-somia/images/hero.png'
  },
  {
    id: 'mohamed-farah',
    title: 'Gallery Memories',
    category: 'wedding',
    description: 'A rich gallery-style invitation showcasing cherished memories and favorite moments.',
    image: '/mohamed-farah/images/hero.png'
  },
  {
    id: 'omar-laila',
    title: 'Golden Horizon',
    category: 'wedding',
    description: 'A romantic Egyptian-themed invitation with hand-drawn sketches and warm golden tones.',
    image: '/omar-laila/images/hero.png'
  },
  {
    id: 'omarlayla',
    title: 'Sunset Journey',
    category: 'wedding',
    description: 'A cinematic travel-inspired wedding invitation with stunning sunset photography.',
    image: '/omarlayla/images/hero.png'
  },


  {
    id: 'zeyad-lara-wedd',
    title: 'Mountain Romance',
    category: 'wedding',
    description: 'A nature-inspired mountain wedding invitation with artistic illustrations and birds.',
    image: null
  },

  // === Engagement ===
  {
    id: 'maya-youssef-engagement',
    title: 'Festive Celebration',
    category: 'engagement',
    description: 'A celebratory engagement invitation with festive imagery and elegant styling.',
    image: null
  },


];

const categories = [
  { key: 'all', label: 'All Designs' },
  { key: 'wedding', label: 'Weddings' },
  { key: 'engagement', label: 'Engagements' },
];

export default function Showcase() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filtered = activeCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  const [activeTemplate, setActiveTemplate] = useState(filtered[0]);

  useEffect(() => {
    setActiveTemplate(filtered[0]);
  }, [activeCategory]);

  return (
    <section id="designs" className="py-24 bg-brand-light relative">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 reveal-on-scroll">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-serif text-brand-dark mb-6 tracking-tight">Our Curated <br/><span className="text-brand-accent italic">Collection</span></h2>
            <p className="text-xl text-brand-dark/70 font-light max-w-lg leading-relaxed">
              Explore our exclusive digital invitations. Hover to preview their unique elegance and style.
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="flex gap-2 mt-8 md:mt-0 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.key
                    ? 'bg-brand-dark text-white shadow-md'
                    : 'bg-white text-brand-dark/70 hover:bg-brand-dark/5 border border-brand-dark/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Split Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-16 relative">
          
          {/* Left Column: List */}
          <div className="col-span-6 space-y-4 pb-32">
            {filtered.map((template) => {
              const isActive = activeTemplate?.id === template.id;
              return (
                <div 
                  key={template.id}
                  onMouseEnter={() => setActiveTemplate(template)}
                  className={`group flex flex-col p-6 rounded-[1.5rem] cursor-pointer transition-all duration-500 ease-out ${
                    isActive ? 'bg-white shadow-xl shadow-brand-dark/5 border border-white scale-[1.02]' : 'hover:bg-white/60 border border-transparent scale-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-medium tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-brand-accent' : 'text-brand-dark/30'}`}>
                        0{filtered.indexOf(template) + 1}
                      </span>
                      <h3 className={`text-3xl lg:text-4xl font-serif transition-colors duration-300 ${isActive ? 'text-brand-dark' : 'text-brand-dark/40 group-hover:text-brand-dark/70'}`}>
                        {template.title}
                      </h3>
                    </div>
                    <ArrowRight className={`w-6 h-6 transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0 text-brand-accent' : 'opacity-0 -translate-x-4 text-brand-dark/20'}`} />
                  </div>
                  
                  <div className={`grid transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                    <div className="min-h-0 pl-10 pr-4">
                      <p className="text-brand-dark/60 text-lg font-light leading-relaxed mb-6">
                        {template.description}
                      </p>
                      <a 
                        href={`${import.meta.env.BASE_URL}${template.id}/index.html`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-brand-dark border-b border-brand-dark pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors"
                      >
                        View Full Experience <Eye className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Preview */}
          <div className="col-span-6 relative">
            <div className="sticky top-32 h-[75vh] flex items-center justify-end pr-4">
               <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                  {filtered.map(template => (
                    <div 
                      key={`img-${template.id}`}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        activeTemplate?.id === template.id ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    >
                      {template.image ? (
                        <img 
                          src={`${import.meta.env.BASE_URL}${template.image.replace(/^\//, '')}`} 
                          alt={template.title} 
                          className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${
                            activeTemplate?.id === template.id ? 'scale-100' : 'scale-110'
                          }`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-brand-light">
                          <span className="font-serif text-3xl text-brand-dark/20">{template.title}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Overlay Action */}
                  <div className="absolute inset-0 z-20 bg-brand-dark/20 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <a 
                      href={activeTemplate ? `${import.meta.env.BASE_URL}${activeTemplate.id}/index.html` : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-brand-dark px-8 py-4 rounded-full font-medium shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:scale-105 transition-all flex items-center gap-2 group"
                    >
                      <Eye className="w-5 h-5 group-hover:text-brand-accent transition-colors" />
                      Open Template
                    </a>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout: Premium Stacked Cards */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {filtered.map((template) => (
             <div key={template.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-lg border border-brand-dark/5">
                <div className="relative aspect-[4/5] w-full bg-brand-light overflow-hidden">
                   {template.image && (
                     <img 
                       src={`${import.meta.env.BASE_URL}${template.image.replace(/^\//, '')}`} 
                       alt={template.title} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                   <div className="absolute bottom-8 left-8 right-8">
                     <span className="text-[10px] uppercase tracking-widest text-brand-accent font-medium mb-3 block">
                       {template.category}
                     </span>
                     <h3 className="text-4xl font-serif text-white mb-3">{template.title}</h3>
                   </div>
                </div>
                <div className="p-8">
                   <p className="text-brand-dark/70 text-base mb-8 leading-relaxed font-light">
                     {template.description}
                   </p>
                   <a 
                     href={`${import.meta.env.BASE_URL}${template.id}/index.html`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-full inline-flex items-center justify-center gap-3 text-base font-medium bg-brand-light text-brand-dark px-6 py-4 rounded-full transition-all hover:bg-brand-dark hover:text-white"
                   >
                     View Design
                     <ArrowRight className="w-5 h-5" />
                   </a>
                </div>
             </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
