import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
        <a href="#" className="flex items-center -ml-2">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ajwaa" className="h-16 md:h-20 w-auto object-contain mix-blend-multiply" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          <a href="#designs" className="hover:text-brand-accent transition-colors">Designs</a>
          <a href="#process" className="hover:text-brand-accent transition-colors">Process</a>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://www.instagram.com/ajwaa.eg_26/?hl=en" target="_blank" rel="noopener noreferrer" className="bg-brand-dark text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors">
            Contact Us
          </a>
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
          <a href="https://www.instagram.com/ajwaa.eg_26/?hl=en" target="_blank" rel="noopener noreferrer" className="w-full bg-brand-dark text-white px-6 py-3 rounded-full text-sm font-medium mt-2 text-center block">
            Contact Us
          </a>
        </div>
      )}
    </header>
  );
}
