import HeroInvitationStage from '../HeroInvitationStage';
import { ArrowRight, Clock3, MessageCircle, Smartphone, Sparkles, Tag } from 'lucide-react';
import { getOrderUrl, isPremiumOfferActive, premiumOffer, trackOrderStart } from '../../lib/order';

export default function Hero({ designCount }: { designCount: number }) {
  const premiumOfferActive = isPremiumOfferActive();

  return (
    <section className="relative lg:min-h-[92vh] flex items-center justify-center pt-28 pb-12 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#d4b58e]/20 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#e8e2d5]/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

          {/* Text Content */}
          <div className="w-full lg:flex-1 text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium tracking-wide">
                {premiumOfferActive
                  ? `Premium Upgrade Week · Only ${premiumOffer.bookingLimit} slots`
                  : 'Digital wedding & engagement invitations'}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif text-brand-dark mb-6 leading-[1.08] text-balance">
              Pick a design. <br />
              <span className="text-brand-accent italic">We make it yours.</span>
            </h1>

            <p className="text-lg md:text-xl text-brand-dark/70 mb-9 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Choose from {designCount} designs, send us your names and date on WhatsApp, and receive an invitation
              ready to share with your guests within 72 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#designs" className="w-full sm:w-auto bg-brand-dark text-white px-8 py-4 rounded-full font-medium hover:bg-black transition-all flex items-center justify-center gap-2 group">
                Browse {designCount} designs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href={getOrderUrl()} target="_blank" rel="noopener noreferrer" onClick={() => trackOrderStart({}, 'hero')} className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-brand-dark border border-brand-dark/20 hover:border-brand-dark transition-all flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Ask us on WhatsApp
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-brand-dark/75">
              <li className="inline-flex items-center gap-2"><Clock3 className="w-4 h-4 text-[#9a7544]" />Ready within 72 hours</li>
              <li className="inline-flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#9a7544]" />
                {premiumOfferActive ? `Premium offer · ${premiumOffer.price}` : 'Invitation websites from EGP 600'}
              </li>
              <li className="inline-flex items-center gap-2"><Smartphone className="w-4 h-4 text-[#9a7544]" />Opens on any phone</li>
            </ul>
          </div>

          <div className="w-full lg:flex-1 min-w-0"><HeroInvitationStage /></div>
        </div>
      </div>
    </section>
  );
}
