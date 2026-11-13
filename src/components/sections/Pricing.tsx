/**
 * Prices at a glance: one row per invitation type, each leading straight back
 * to its designs in the gallery (or to WhatsApp for custom work).
 */
import { ArrowRight, Clock3, MessageCircle } from 'lucide-react';
import { usePricingView } from '../../hooks/usePricingView';
import type { InvitationType } from '../../data/catalog';
import { getOrderUrl, trackOrderStart, type InvitationPackage } from '../../lib/order';

type Props = {
  types: InvitationType[];
  onSeeDesigns: (type: InvitationPackage) => void;
};

export default function Pricing({ types, onSeeDesigns }: Props) {
  const pricingRef = usePricingView();

  return (
    <section ref={pricingRef} id="pricing" className="py-20 md:py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">

        <div className="max-w-2xl mb-10 reveal-on-scroll">
          <p className="text-sm font-medium tracking-wide text-[#8c7457] mb-3">Simple pricing</p>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4 tracking-tight">Prices at a glance</h2>
          <p className="text-lg text-brand-dark/70 font-light leading-relaxed">
            One price per invitation type — whichever design you choose within it.
          </p>
        </div>

        <ul className="rounded-[1.5rem] border border-brand-dark/10 divide-y divide-brand-dark/10 overflow-hidden reveal-on-scroll">
          {types.map((type) => {
            const isCustom = type.designs.length === 0;
            return (
              <li key={type.id} className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_9rem_11rem] items-center gap-x-4 gap-y-3 px-5 py-5 sm:px-7 bg-brand-light/50">
                <div>
                  <h3 className="font-serif text-xl text-brand-dark">{type.name}</h3>
                  <p className="text-sm text-brand-dark/65 font-light mt-1 leading-relaxed">{type.summary}</p>
                </div>

                <p className="text-right sm:text-left leading-tight">
                  {type.regularPrice && <s className="block text-sm text-brand-dark/45">{type.regularPrice}</s>}
                  <span className={`font-serif text-brand-dark whitespace-nowrap ${isCustom ? 'text-lg' : 'text-2xl'}`}>{type.price}</span>
                  {type.priceNote && <span className="block text-xs text-brand-dark/55 mt-0.5">{type.priceNote}</span>}
                </p>

                <div className="col-span-2 sm:col-span-1 sm:justify-self-end">
                  {isCustom ? (
                    <a
                      href={getOrderUrl({ package: type.id })}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackOrderStart({ package: type.id }, 'pricing')}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-5 py-2.5 text-sm font-medium text-white hover:bg-black transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" /> Ask for a quote
                    </a>
                  ) : (
                    <a
                      href="#designs"
                      onClick={() => onSeeDesigns(type.id)}
                      className="group inline-flex items-center gap-2 rounded-full border border-brand-dark/20 bg-white px-5 py-2.5 text-sm font-medium text-brand-dark hover:border-brand-dark transition-colors"
                    >
                      See {type.designs.length} designs <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 flex items-center gap-2 text-sm text-brand-dark/65">
          <Clock3 className="w-4 h-4 text-[#9a7544] shrink-0" />
          Every order is delivered within 72 hours of confirming your details.
        </p>
      </div>
    </section>
  );
}
