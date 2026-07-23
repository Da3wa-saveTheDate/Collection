import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Eye } from 'lucide-react';

const templates = [
  {
    id: 'new_simple1',
    title: 'Elegant Photo Scratch',
    category: 'simple-websites',
    description: 'A beautiful simple website template.',
    image: '/new_simple1/assets/hero-frame-D95C6j_a.png'
  },
  {
    id: 'thelaceedit',
    title: 'The Lace Edit',
    category: 'simple-websites',
    description: 'A beautiful simple website template.',
    image: '/thelaceedit/assets/hero-frame-ChwB8WzS.png'
  },
  {
    id: 'cisnes',
    title: 'Cisnes',
    category: 'simple-websites',
    description: 'A beautiful simple website template.',
    image: '/cisnes/assets/images/hero-frame-76CGo-SF.png'
  },
  // === Wedding Templates (with /images/ folder) ===
  {
    id: 'celestial-love',
    title: 'Celestial Love',
    category: 'wedding',
    description: 'A heavenly design featuring soft starlight and ethereal elegance for romantic unions.',
    image: '/celestial-love/images/hero.webp'
  },
  {
    id: 'desert-rose',
    title: 'Desert Rose',
    category: 'wedding',
    description: 'Warm terracotta tones and organic shapes inspired by breathtaking desert sunsets.',
    image: '/desert-rose/images/hero.webp'
  },
  {
    id: 'emerald-noir',
    title: 'Emerald Noir',
    category: 'wedding',
    description: 'Deep, luxurious greens paired with gold accents for a highly sophisticated atmosphere.',
    image: '/emerald-noir/images/hero.webp'
  },
  {
    id: 'cherry-blossom',
    title: 'Cherry Blossom',
    category: 'wedding',
    description: 'Delicate pinks and floral motifs bringing a sense of spring and new beginnings.',
    image: '/cherry-blossom/images/hero.webp'
  },
  {
    id: 'midnight-garden',
    title: 'Midnight Garden',
    category: 'wedding',
    description: 'Dark, romantic floral aesthetics with a mysterious and enchanting vibe.',
    image: '/midnight-garden/images/hero.webp'
  },
  {
    id: 'royal-blue',
    title: 'Royal Blue',
    category: 'wedding',
    description: 'Classic, regal navy blue with silver foil accents for a timeless celebration.',
    image: '/royal-blue/images/hero.webp'
  },
  {
    id: 'coral-sunset',
    title: 'Coral Sunset',
    category: 'wedding',
    description: 'Vibrant coral hues blending into golden sunlight for a warm, joyful celebration.',
    image: '/coral-sunset/images/hero.webp'
  },
  {
    id: 'olive-sage',
    title: 'Earthy Botanical',
    category: 'wedding',
    description: 'Earthy olive greens and soft sage tones for a natural, organic wedding aesthetic.',
    image: '/olive-sage/images/hero.webp'
  },
  {
    id: 'velvet-theatre',
    title: 'Velvet Theatre',
    category: 'wedding',
    description: 'Rich velvet textures and dramatic curtain-inspired layouts for a grand affair.',
    image: '/velvet-theatre/images/hero.webp'
  },
  {
    id: 'new_prem2',
    title: 'New Premium',
    category: 'premium-wedding',
    description: 'A beautiful and elegant premium wedding design.',
    image: '/new_prem2/images/hero.jpg'
  },
  {
    id: 'new_prem3',
    title: 'Majestic Template',
    category: 'premium-wedding',
    description: 'A majestic and elegant design for an unforgettable celebration.',
    image: '/new_prem3/images/hero.webp'
  },
  {
    id: 'new_prem4',
    title: 'Classic Romance',
    category: 'premium-wedding',
    description: 'A charming and personal wedding template.',
    image: '/new_prem4/images/hero.webp'
  },
  {
    id: 'new_prem5',
    title: 'Elegant Moments',
    category: 'premium-wedding',
    description: 'A beautiful save the date template with elegant details.',
    image: '/new_prem5/images/hero.webp'
  },
  {
    id: 'new_prem6',
    title: 'Maldives Demo',
    category: 'premium-wedding',
    description: 'A breathtaking tropical and beach-themed wedding design.',
    image: '/new_prem6/images/hero.webp'
  },
  {
    id: 'new_prem7',
    title: 'Bilingual Elegance',
    category: 'premium-wedding',
    description: 'A wonderful bilingual wedding invitation layout.',
    image: '/new_prem7/images/hero.webp'
  },
  {
    id: 'new_prem9',
    title: 'New Premium2',
    category: 'premium-wedding',
    description: 'A luxurious new premium wedding template.',
    image: '/new_prem9/assets/l5e-images/hero-poster-DsqR-n3x.jpg'
  },
  {
    id: 'new_ss',
    title: 'Seaside Celebration',
    category: 'premium-wedding',
    description: 'An elegant premium wedding invitation featuring beautiful animations.',
    image: '/new_ss/assets/intro-poster-new-B2unBQtC.jpg'
  },

  // === Wedding Templates (custom image paths) ===
  {
    id: 'adamfarah12',
    title: 'Vintage Sketch',
    category: 'wedding',
    description: 'A charming hand-sketched wedding invitation with elegant illustrations and warm touches.',
    image: '/adamfarah12/images/hero.webp'
  },
  {
    id: 'elisa-jhon-wedding',
    title: 'Vintage Fairytale',
    category: 'premium-wedding',
    description: 'A whimsical fairy-tale wedding with chandeliers, cupids, and enchanting vintage décor.',
    image: '/elisa-jhon-wedding/images/hero.webp'
  },
  {
    id: 'karim-somia',
    title: 'Heartfelt Moments',
    category: 'wedding',
    description: 'A heartfelt, personal wedding invitation capturing genuine moments of love.',
    image: '/karim-somia/images/hero.webp'
  },
  {
    id: 'mohamed-farah',
    title: 'Gallery Memories',
    category: 'wedding',
    description: 'A rich gallery-style invitation showcasing cherished memories and favorite moments.',
    image: '/mohamed-farah/images/hero.webp'
  },
  {
    id: 'omar-laila',
    title: 'Golden Horizon',
    category: 'wedding',
    description: 'A romantic Egyptian-themed invitation with hand-drawn sketches and warm golden tones.',
    image: '/omar-laila/images/hero.webp'
  },
  {
    id: 'omarlayla',
    title: 'Sunset Journey',
    category: 'wedding',
    description: 'A cinematic travel-inspired wedding invitation with stunning sunset photography.',
    image: '/omarlayla/images/hero.webp'
  },


  {
    id: 'zeyad-lara-wedd',
    title: 'Mountain Romance',
    category: 'wedding',
    description: 'A nature-inspired mountain wedding invitation with artistic illustrations and birds.',
    image: '/zeyad-lara-wedd/images/hero.webp'
  },

  // === Engagement ===
  {
    id: 'maya-youssef-engagement',
    title: 'Festive Celebration',
    category: 'engagement',
    description: 'A celebratory engagement invitation with festive imagery and elegant styling.',
    image: '/maya-youssef-engagement/images/hero.webp'
  },
  {
    id: 'emerald-gold',
    title: 'Emerald Gold',
    category: 'engagement',
    description: 'An elegant emerald and gold engagement invitation.',
    image: '/emerald-gold/couple.png'
  },
  {
    id: 'garden-bloom',
    title: 'Garden Bloom',
    category: 'engagement',
    description: 'A beautiful botanical garden bloom engagement invitation.',
    image: '/garden-bloom/couple.png'
  },
  {
    id: 'midnight-stars',
    title: 'Midnight Stars',
    category: 'engagement',
    description: 'A magical midnight stars engagement invitation.',
    image: '/midnight-stars/couple.png'
  },
  {
    id: 'selim-menna-wedding',
    title: 'Elegant Romance',
    category: 'wedding',
    description: 'A beautifully elegant romance themed wedding invitation.',
    image: '/selim-menna-wedding/images/hero.webp'
  },
  {
    id: 'yassersalma',
    title: 'Classic Elegance',
    category: 'wedding',
    description: 'A classic and elegant wedding invitation with timeless charm.',
    image: '/yassersalma/images/hero.webp'
  },
  {
    id: 'invitation-fan-1',
    title: 'Invitation Fan 1',
    category: 'invitation fan',
    description: 'Beautiful invitation fan design.',
    image: '/invitation-fan-1/images/hero.webp'
  },
  {
    id: 'invitation-fan-2',
    title: 'Invitation Fan 2',
    category: 'invitation fan',
    description: 'Beautiful invitation fan design.',
    image: '/invitation-fan-2/images/hero.webp'
  },
  {
    id: 'invitation-fan-3',
    title: 'Invitation Fan 3',
    category: 'invitation fan',
    description: 'Beautiful invitation fan design.',
    image: '/invitation-fan-3/images/hero.webp'

  },
  {
    id: 'invitation-card-1',
    title: 'Invitation Card 1',
    category: 'invitation cards',
    description: 'Beautiful invitation card design.',
    image: '/invitation-card-1/images/hero.webp'
  },
  {
    id: 'invitation-card-2',
    title: 'Invitation Card 2',
    category: 'invitation cards',
    description: 'Beautiful invitation card design.',
    image: '/invitation-card-2/images/hero.webp'
  },
  {
    id: 'invitation-card-3',
    title: 'Invitation Card 3',
    category: 'invitation cards',
    description: 'Beautiful invitation card design.',
    image: '/invitation-card-3/images/hero.webp'
  },
  {
    id: 'invitation-card-4',
    title: 'Invitation Card 4',
    category: 'invitation cards',
    description: 'Beautiful invitation card design.',
    image: '/invitation-card-4/images/hero.webp'
  },
  {
    id: 'invitation-card-5',
    title: 'Invitation Card 5',
    category: 'invitation cards',
    description: 'Beautiful invitation card design.',
    image: '/invitation-card-5/images/hero.webp'
  }
];

const categories = [
  { key: 'premium-wedding', label: 'Premium Wedding' },
  { key: 'wedding', label: 'Weddings' },
  { key: 'engagement', label: 'Engagements' },
  { key: 'invitation fan', label: 'Invitation Fan' },
  { key: 'invitation cards', label: 'Invitation Cards' },
  { key: 'simple-websites', label: 'Simple Websites' },
];

export default function Showcase() {
  const [activeCategory, setActiveCategory] = useState('premium-wedding');
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const [phoneScale, setPhoneScale] = useState(1);
  const mobilePhoneContainerRef = useRef<HTMLDivElement>(null);
  const [mobilePhoneScale, setMobilePhoneScale] = useState(1);

  useEffect(() => {
    const el = phoneContainerRef.current;
    const mobileEl = mobilePhoneContainerRef.current;
    
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === el) setPhoneScale(entry.contentRect.width / 390);
        if (entry.target === mobileEl) setMobilePhoneScale(entry.contentRect.width / 390);
      }
    });
    
    if (el) observer.observe(el);
    if (mobileEl) observer.observe(mobileEl);
    
    return () => observer.disconnect();
  }, []);
  
  const filtered = activeCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  const mobileFiltered = filtered;

  const [activeTemplate, setActiveTemplate] = useState(filtered[0]);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set([filtered[0]?.id]));
  const [isHoveringList, setIsHoveringList] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  useEffect(() => {
    if (activeTemplate) {
      setLoadedImages(prev => {
        const next = new Set(prev);
        next.add(activeTemplate.id);
        return next;
      });
    }
  }, [activeTemplate]);

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

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
          <div className="flex flex-wrap justify-start md:justify-end gap-2 mt-8 md:mt-0 w-full md:w-auto md:max-w-[50%]">
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
          <div 
            className="col-span-6 space-y-4 pb-32"
            onMouseEnter={() => setIsHoveringList(true)}
            onMouseLeave={() => setIsHoveringList(false)}
          >
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
                        {String(filtered.indexOf(template) + 1).padStart(2, '0')}
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
                        href={`${import.meta.env.BASE_URL}${template.id}/`}
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
             <div className="sticky top-32 h-[calc(100vh-12rem)] max-h-[800px] flex items-center justify-end pr-4">
                
                {/* Phone Frame Mockup */}
                <div className="relative h-full aspect-[9/19.5] w-auto rounded-[3rem] overflow-hidden bg-brand-dark shadow-2xl border-[8px] md:border-[10px] border-brand-dark transition-transform duration-700 hover:scale-[1.02]">
                   
                   {/* Top Notch / Dynamic Island */}
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] min-w-[80px] max-w-[120px] h-[30px] bg-brand-dark rounded-b-3xl z-40"></div>
                   
                   <div ref={phoneContainerRef} className="relative w-full h-full bg-brand-light rounded-[2.25rem] overflow-hidden">
                     {isDesktop && filtered.map(template => (
                       <div 
                         key={`preview-${template.id}`}
                         className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                           activeTemplate?.id === template.id ? 'opacity-100 z-10' : 'opacity-0 z-0'
                         }`}
                       >
                         {/* Static Image (Visible when not hovering list) */}
                         <div className={`absolute inset-0 transition-opacity duration-700 ${isHoveringList && activeTemplate?.id === template.id ? 'opacity-0' : 'opacity-100'}`}>
                           {template.image && loadedImages.has(template.id) ? (
                             <img 
                               src={`${import.meta.env.BASE_URL}${template.image.replace(/^\//, '')}`} 
                               alt={template.title} 
                               loading={template.id === filtered[0]?.id ? "eager" : "lazy"}
                               decoding="async"
                               className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${
                                 activeTemplate?.id === template.id ? 'scale-100' : 'scale-110'
                               }`}
                             />
                           ) : template.image && !loadedImages.has(template.id) ? (
                             null
                           ) : (
                             <div className="w-full h-full flex items-center justify-center bg-brand-light">
                               <span className="font-serif text-3xl text-brand-dark/20">{template.title}</span>
                             </div>
                           )}
                         </div>

                         {/* Live iframe (Fades in when hovering list) */}
                         {activeTemplate?.id === template.id && (
                           <div className={`absolute inset-0 transition-opacity duration-700 delay-150 ${isHoveringList ? 'opacity-100' : 'opacity-0'}`}>
                              {isHoveringList && (
                                <div 
                                  className="absolute top-0 left-0 w-[390px] h-[844px] origin-top-left pointer-events-none"
                                  style={{ transform: `scale(${phoneScale})` }}
                                >
                                  <iframe 
                                    src={`${import.meta.env.BASE_URL}${template.id}/`}
                                    className="w-full h-full border-0"
                                    style={{
                                      scrollbarWidth: 'none',
                                      msOverflowStyle: 'none'
                                    }}
                                    title={`${template.title} live preview`}
                                    loading="lazy"
                                  />
                                </div>
                              )}
                           </div>
                         )}
                       </div>
                     ))}
                    
                    {/* Overlay Action */}
                    <div className="absolute inset-0 z-50 bg-brand-dark/20 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                      <a 
                        href={activeTemplate ? `${import.meta.env.BASE_URL}${activeTemplate.id}/` : '#'}
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
        </div>

        {/* Mobile Layout: Interactive Preview */}
        <div className="lg:hidden mt-8">
          {/* Mobile Phone Frame */}
          <div className="relative flex justify-center mb-10 h-[60vh] min-h-[450px] z-10">
             <div className="relative h-full aspect-[9/19.5] w-auto rounded-[2.5rem] overflow-hidden bg-brand-dark shadow-2xl border-[6px] border-brand-dark transition-transform duration-500">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] min-w-[60px] max-w-[100px] h-[20px] bg-brand-dark rounded-b-2xl z-40"></div>
               
               <div ref={mobilePhoneContainerRef} className="relative w-full h-full bg-brand-light rounded-[2rem] overflow-hidden">
                 {mobileFiltered.map(template => (
                   <div 
                     key={`mobile-preview-${template.id}`}
                     className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                       activeTemplate?.id === template.id ? 'opacity-100 z-10' : 'opacity-0 z-0'
                     }`}
                   >
                     {/* Static Image (Fades out when active) */}
                     <div className={`absolute inset-0 transition-opacity duration-700 ${activeTemplate?.id === template.id ? 'opacity-0' : 'opacity-100'}`}>
                       {template.image && loadedImages.has(template.id) ? (
                         <img 
                           src={`${import.meta.env.BASE_URL}${template.image.replace(/^\//, '')}`} 
                           alt={template.title} 
                           className="w-full h-full object-cover"
                         />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center bg-brand-light">
                           <span className="font-serif text-2xl text-brand-dark/20">{template.title}</span>
                         </div>
                       )}
                     </div>

                     {/* Live iframe */}
                     {activeTemplate?.id === template.id && (
                       <div className="absolute inset-0 transition-opacity duration-700 delay-150 opacity-100 bg-brand-light">
                          <div 
                            className="absolute top-0 left-0 w-[390px] h-[844px] origin-top-left pointer-events-none"
                            style={{ transform: `scale(${mobilePhoneScale})` }}
                          >
                            <iframe 
                              src={`${import.meta.env.BASE_URL}${template.id}/`}
                              className="w-full h-full border-0"
                              style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none'
                              }}
                              title={`${template.title} live preview`}
                              loading="lazy"
                            />
                          </div>
                       </div>
                     )}
                     
                     {/* Overlay Action */}
                     <div className="absolute inset-0 z-50 bg-brand-dark/20 opacity-0 active:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                       <a 
                         href={`${import.meta.env.BASE_URL}${template.id}/`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="bg-white text-brand-dark px-6 py-3 rounded-full font-medium shadow-xl flex items-center gap-2"
                       >
                         <Eye className="w-4 h-4" />
                         Open
                       </a>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>

          {/* Horizontal Template Selector */}
          <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory px-4 -mx-4 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {mobileFiltered.map((template, index) => {
              const isActive = activeTemplate?.id === template.id;
              return (
                <button 
                  key={`mobile-list-${template.id}`}
                  onClick={() => setActiveTemplate(template)}
                  className={`snap-center shrink-0 w-[260px] sm:w-[300px] text-left group bg-white rounded-[1.5rem] overflow-hidden shadow-lg border transition-all duration-300 ${
                    isActive ? 'border-brand-accent ring-2 ring-brand-accent/20 scale-100' : 'border-brand-dark/5 scale-95 opacity-70'
                  }`}
                >
                  <div className="relative w-full h-[200px] bg-brand-light overflow-hidden">
                    {template.image && (
                      <img 
                        src={`${import.meta.env.BASE_URL}${template.image.replace(/^\//, '')}`} 
                        alt={template.title} 
                        loading={index < 3 ? 'eager' : 'lazy'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                    <div className="absolute bottom-4 left-5 right-5">
                      <span className="text-[9px] uppercase tracking-widest text-brand-accent font-medium mb-1 block">
                        {template.category}
                      </span>
                      <h3 className="text-xl font-serif text-white">{template.title}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-brand-dark/70 text-sm mb-4 leading-relaxed font-light line-clamp-2">
                      {template.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-brand-dark">
                      Select <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-brand-accent' : ''}`} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
}

