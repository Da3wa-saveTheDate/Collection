import { MessageCircle } from 'lucide-react';
import { getOrderUrl, trackOrderStart } from '../../lib/order';

export default function Footer() {
  return (
    <footer className="bg-brand-light pt-24 pb-8 border-t border-brand-dark/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="md:col-span-1">
            <a href="#" className="block mb-6 -ml-2">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ajwaa" className="h-24 w-auto object-contain" />
            </a>
            <p className="text-brand-dark/60 font-light text-sm leading-relaxed mb-6">
              Elegant digital invitations for your celebrations. Choose your design and send your details in minutes.
            </p>
            <div className="flex gap-4">
              <a href={getOrderUrl()} target="_blank" rel="noopener noreferrer" onClick={() => trackOrderStart()} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-colors shadow-sm" aria-label="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/ajwaa.eg_26/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-colors shadow-sm" aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-brand-dark mb-6 tracking-wide text-sm">Explore</h4>
            <ul className="space-y-4 text-sm font-light text-brand-dark/70">
              <li><a href="#pricing" className="hover:text-brand-accent transition-colors">Pricing</a></li>
              <li><a href="#designs" className="hover:text-brand-accent transition-colors">All Designs</a></li>
              <li><a href="#process" className="hover:text-brand-accent transition-colors">How It Works</a></li>
            </ul>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-brand-dark/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-dark/50 font-light">
          <p>© {new Date().getFullYear()} Ajwaa. All rights reserved.</p>
          <p>All orders delivered within 72 hours.</p>
        </div>
      </div>
    </footer>
  );
}
