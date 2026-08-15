import { ArrowRight, Check, Clock3, MessageCircle, Sparkles } from 'lucide-react';
import { getOrderUrl, trackOrderStart } from '../../lib/order';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#d4b58e]/20 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#e8e2d5]/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:flex-1 text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium tracking-wide">Digital invitations made for your moment</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif text-brand-dark mb-6 leading-[1.1] text-balance">
              Choose Your Invitation <br />
              <span className="text-brand-accent italic">With Ease</span>
            </h1>
            
            <p className="text-lg md:text-xl text-brand-dark/70 mb-10 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Browse the designs, choose your package, and send your event details through WhatsApp. Your invitation will be ready within 72 hours.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#designs" className="w-full sm:w-auto bg-brand-dark text-white px-8 py-4 rounded-full font-medium hover:bg-black transition-all flex items-center justify-center gap-2 group">
                View Designs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href={getOrderUrl()} target="_blank" rel="noopener noreferrer" onClick={() => trackOrderStart()} className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-brand-dark border border-brand-dark/20 hover:border-brand-dark transition-all flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Order on WhatsApp
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-3 text-sm text-brand-dark/70">
              <span className="inline-flex items-center gap-2"><Clock3 className="w-4 h-4 text-brand-accent" />Delivered within 72 hours</span>
              <span className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-brand-accent" />Simple Invitation · EGP 600</span>
            </div>
          </div>

          {/* Floating Mockups */}
          <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] mt-10 lg:mt-0 lg:flex-1 shrink-0 block">
            {/* Main Mockup */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[220px] md:w-[280px] h-[380px] sm:h-[460px] md:h-[580px] rounded-[2rem] md:rounded-[2.5rem] bg-white shadow-2xl p-1.5 md:p-2 z-20 animate-float">
              <div className="w-full h-full rounded-[1.75rem] md:rounded-[2rem] overflow-hidden relative">
                <img src={`${import.meta.env.BASE_URL}celestial-love/images/hero.webp`} alt="Celestial Love" className="w-full h-full object-cover" />
              </div>
            </div>
            
            {/* Secondary Mockup (Left/Back) */}
            <div className="absolute top-[40%] left-[5%] sm:left-[10%] md:left-[10%] -translate-y-1/2 w-[140px] sm:w-[180px] md:w-[240px] h-[300px] sm:h-[380px] md:h-[500px] rounded-[1.5rem] md:rounded-[2rem] bg-white/80 shadow-xl p-1.5 md:p-2 z-10 -rotate-6 blur-[1px] animate-float" style={{ animationDelay: '1s' }}>
              <div className="w-full h-full rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden relative">
                <img src={`${import.meta.env.BASE_URL}desert-rose/images/hero.webp`} alt="Desert Rose" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Tertiary Mockup (Right/Back) */}
            <div className="absolute top-[60%] right-[5%] sm:right-[10%] md:right-[10%] -translate-y-1/2 w-[140px] sm:w-[180px] md:w-[240px] h-[300px] sm:h-[380px] md:h-[500px] rounded-[1.5rem] md:rounded-[2rem] bg-white/80 shadow-xl p-1.5 md:p-2 z-10 rotate-6 blur-[1px] animate-float" style={{ animationDelay: '2s' }}>
              <div className="w-full h-full rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden relative">
                <img src={`${import.meta.env.BASE_URL}emerald-noir/images/hero.webp`} alt="Emerald Noir" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
