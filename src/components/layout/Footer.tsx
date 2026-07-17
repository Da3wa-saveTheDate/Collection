export default function Footer() {
  return (
    <footer className="bg-brand-light pt-24 pb-8 border-t border-brand-dark/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <a href="#" className="font-serif text-3xl font-semibold tracking-wide text-brand-dark block mb-6">
              Ajwaa
            </a>
            <p className="text-brand-dark/60 font-light text-sm leading-relaxed mb-6">
              Elevating the art of invitations with modern, luxurious digital experiences tailored for your eternal moments.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/ajwaa.eg_26/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-colors shadow-sm" aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-brand-dark mb-6 tracking-wide uppercase text-sm">Collection</h4>
            <ul className="space-y-4 text-sm font-light text-brand-dark/70">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Weddings</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Engagements</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Corporate Events</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-brand-dark mb-6 tracking-wide uppercase text-sm">Company</h4>
            <ul className="space-y-4 text-sm font-light text-brand-dark/70">
              <li><a href="#" className="hover:text-brand-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">How It Works</a></li>
              <li><a href="https://www.instagram.com/ajwaa.eg_26/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-brand-dark mb-6 tracking-wide uppercase text-sm">Legal</h4>
            <ul className="space-y-4 text-sm font-light text-brand-dark/70">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-brand-dark/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-dark/50 font-light">
          <p>&copy; {new Date().getFullYear()} Ajwaa. All rights reserved.</p>
          <p>Designed with elegance in mind.</p>
        </div>
      </div>
    </footer>
  );
}
