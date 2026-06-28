export default function Footer() {
  return (
    <footer id="faq" className="bg-brand-light pt-24 pb-8 border-t border-brand-dark/5">
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
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-colors shadow-sm" aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-colors shadow-sm" aria-label="X / Twitter">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-colors shadow-sm" aria-label="Facebook">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.09.05 1.592.145v3.254a9 9 0 0 0-.92-.043c-1.306 0-1.811.498-1.811 1.793V12.05h2.6l-.49 3.666h-2.11v8.063A10.008 10.008 0 0 0 22 14.005C22 8.485 17.52 4 12 4S2 8.485 2 14.005a10.003 10.003 0 0 0 7.101 9.686z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-brand-dark mb-6 tracking-wide uppercase text-sm">Collection</h4>
            <ul className="space-y-4 text-sm font-light text-brand-dark/70">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Weddings</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Engagements</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Birthdays</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Corporate Events</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-brand-dark mb-6 tracking-wide uppercase text-sm">Company</h4>
            <ul className="space-y-4 text-sm font-light text-brand-dark/70">
              <li><a href="#" className="hover:text-brand-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Contact</a></li>
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
