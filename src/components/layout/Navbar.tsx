import { useState, useEffect } from 'react';
import { Menu, X, Globe, Moon } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div 
        className={`max-w-6xl mx-auto rounded-full flex items-center justify-between px-6 py-3 transition-all duration-300 ${
          isScrolled ? 'glass shadow-sm' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a href="#" className="font-serif text-2xl font-semibold tracking-wide text-brand-dark">
          Ajwaa
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          <a href="#designs" className="hover:text-brand-accent transition-colors">Designs</a>
          <a href="#process" className="hover:text-brand-accent transition-colors">Process</a>
          <a href="#pricing" className="hover:text-brand-accent transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-brand-accent transition-colors">FAQ</a>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors" aria-label="Toggle language">
            <Globe className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors" aria-label="Toggle theme">
            <Moon className="w-5 h-5" />
          </button>
          <button className="bg-brand-dark text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors">
            Contact Us
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-brand-dark"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[calc(100%+1rem)] left-4 right-4 glass rounded-2xl p-6 flex flex-col gap-4 shadow-lg animate-fade-up">
          <a href="#designs" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Designs</a>
          <a href="#process" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Process</a>
          <a href="#pricing" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#faq" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <hr className="border-black/10 my-2" />
          <div className="flex justify-between items-center">
             <span className="font-medium">Language</span>
             <Globe className="w-5 h-5" />
          </div>
          <button className="w-full bg-brand-dark text-white px-6 py-3 rounded-full text-sm font-medium mt-2">
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
}
