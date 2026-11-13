import { useState, useEffect } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { getOrderUrl, trackOrderStart } from '../../lib/order';

/** In page order, so the menu reads like the journey. */
const links: Array<{ id: string; label: string; target?: string }> = [
  { id: 'process', label: 'How it works' },
  { id: 'designs', label: 'Designs' },
  { id: 'pricing', label: 'Prices' },
  { id: 'experience', label: 'Try your names', target: 'personalise' },
];

/** Highlights the section the visitor is currently reading. */
function useCurrentSection() {
  const [current, setCurrent] = useState<string>();
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const visible = new Set<string>();
    // A thin band just under the navbar decides which section is "current".
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      setCurrent(links.find((link) => visible.has(link.id))?.id);
    }, { rootMargin: '-30% 0px -65% 0px' });
    for (const link of links) {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);
  return current;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const current = useCurrentSection();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 md:px-8 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div
        className={`max-w-6xl mx-auto rounded-full flex items-center justify-between gap-3 pl-3 pr-2 sm:pl-5 sm:pr-3 py-2 transition-all duration-300 ${
          isScrolled || mobileMenuOpen ? 'glass shadow-sm' : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center shrink-0" aria-label="Ajwaa — back to top">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ajwaa" className="h-11 md:h-12 w-auto object-contain" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 font-medium text-sm" aria-label="Main">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.target ?? link.id}`}
              aria-current={current === link.id ? 'true' : undefined}
              className={`px-4 py-2 rounded-full transition-colors ${
                current === link.id ? 'bg-brand-dark/8 text-brand-dark' : 'text-brand-dark/75 hover:text-brand-dark hover:bg-brand-dark/5'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a href={getOrderUrl()} target="_blank" rel="noopener noreferrer" onClick={() => trackOrderStart({}, 'navbar')} className="bg-brand-dark text-white px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors inline-flex items-center gap-2 whitespace-nowrap">
            <MessageCircle className="w-4 h-4" />
            <span className="sm:hidden">Order</span>
            <span className="hidden sm:inline">Order on WhatsApp</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2.5 text-brand-dark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden absolute top-[calc(100%+0.25rem)] left-3 right-3 bg-white/95 backdrop-blur-md border border-brand-dark/10 rounded-2xl p-3 flex flex-col shadow-lg animate-fade-up" aria-label="Main">
          {links.map((link, index) => (
            <a
              key={link.id}
              href={`#${link.target ?? link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-3.5 rounded-xl text-lg font-medium ${current === link.id ? 'bg-brand-dark/5' : ''}`}
            >
              <span className="grid place-items-center w-7 h-7 rounded-full bg-brand-light text-xs text-brand-dark/60">{index + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
