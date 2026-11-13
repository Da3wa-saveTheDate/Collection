/**
 * The gallery — the heart of the page.
 *
 * One tab per invitation type (each tab carries its price), a grid of
 * thumbnails underneath, and a preview dialog to look at a design and order
 * it. Browsing and pricing are the same step, so nobody has to match a
 * package name to a design category.
 */
import { useCallback, useEffect, useState } from 'react';
import { Check, Clock3, Eye, MessageCircle, Play } from 'lucide-react';
import DesignPreview from '../DesignPreview';
import { occasionLabel, thumbUrl, type InvitationType, type Template } from '../../data/catalog';
import { getOrderUrl, trackOrderStart, type InvitationPackage } from '../../lib/order';
import { trackEvent } from '../../lib/telemetry';

type Props = {
  types: InvitationType[];
  activeType: InvitationPackage;
  onTypeChange: (type: InvitationPackage) => void;
};

/** Marks the history entry added while the preview is open, so Back closes it. */
const HISTORY_FLAG = 'ajwaaPreview';

export default function Showcase({ types, activeType, onTypeChange }: Props) {
  const tabs = types.filter((type) => type.designs.length > 0);
  const active = tabs.find((type) => type.id === activeType) ?? tabs[0];
  const designs = active.designs;
  const [selected, setSelected] = useState<Template | null>(null);

  // The phone's Back button closes the preview instead of leaving the page.
  useEffect(() => {
    const onPop = () => setSelected(null);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const open = (template: Template) => {
    setSelected(template);
    trackEvent('template_previewed', { template: template.id, category: template.category });
    if (!window.history.state?.[HISTORY_FLAG]) window.history.pushState({ [HISTORY_FLAG]: true }, '');
  };

  const close = useCallback(() => {
    if (window.history.state?.[HISTORY_FLAG]) window.history.back(); // → popstate clears the selection
    else setSelected(null);
  }, []);

  const step = useCallback((direction: -1 | 1) => {
    setSelected((current) => {
      if (!current) return current;
      const index = designs.findIndex((design) => design.id === current.id);
      return designs[(index + direction + designs.length) % designs.length];
    });
  }, [designs]);

  const selectedIndex = selected ? designs.findIndex((design) => design.id === selected.id) : -1;

  return (
    <section id="designs" className="py-20 md:py-24 bg-brand-light relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">

        <div className="max-w-2xl mb-10 reveal-on-scroll">
          <p className="text-sm font-medium tracking-wide text-[#8c7457] mb-3">The collection</p>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4 tracking-tight">Choose your design</h2>
          <p className="text-lg text-brand-dark/70 font-light leading-relaxed">
            Pick an invitation type, then tap any design to see it live. Found the one? Order it on WhatsApp in one tap.
          </p>
        </div>

        {/* Invitation types — each tab is a type and its price */}
        <div role="tablist" aria-label="Invitation type" className="grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {tabs.map((type) => {
            const isActive = type.id === active.id;
            return (
              <button
                key={type.id}
                type="button"
                role="tab"
                id={`designs-tab-${type.id}`}
                aria-selected={isActive}
                aria-controls="designs-panel"
                onClick={() => onTypeChange(type.id)}
                className={`rounded-2xl px-2 py-3 sm:px-4 sm:py-4 text-center transition-all cursor-pointer border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a7544] ${
                  isActive
                    ? 'bg-brand-dark text-white border-brand-dark shadow-lg shadow-brand-dark/15'
                    : 'bg-white text-brand-dark border-brand-dark/10 hover:border-brand-dark/40'
                }`}
              >
                <span className="block font-medium text-sm sm:text-base">{type.label}</span>
                <span className={`block text-xs sm:text-sm mt-0.5 ${isActive ? 'text-brand-accent' : 'text-brand-dark/60'}`}>
                  {type.price}{type.id === 'fan' ? ' / piece' : ''}
                </span>
              </button>
            );
          })}
        </div>

        <div id="designs-panel" role="tabpanel" aria-labelledby={`designs-tab-${active.id}`}>
          {/* What the chosen type is, in one glance */}
          <div className="mt-4 rounded-2xl bg-white border border-brand-dark/8 px-5 py-4 sm:px-6 sm:py-5 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-8">
            <p className="text-brand-dark/80 lg:flex-1">
              <span className="font-medium text-brand-dark">{active.name}</span>
              <span className="text-brand-dark/40"> · </span>
              {active.regularPrice && <s className="text-brand-dark/45 mr-1.5">{active.regularPrice}</s>}
              <span className="font-medium text-brand-dark">{active.price}{active.id === 'fan' ? ' per piece' : ''}</span>
              <span className="block text-sm text-brand-dark/65 font-light mt-1">{active.summary}</span>
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-brand-dark/75">
              {active.features.slice(0, 2).map((feature) => (
                <li key={feature} className="inline-flex items-center gap-1.5"><Check className="w-4 h-4 text-[#9a7544] shrink-0" />{feature}</li>
              ))}
              <li className="inline-flex items-center gap-1.5"><Clock3 className="w-4 h-4 text-[#9a7544] shrink-0" />Ready within 72 hours</li>
            </ul>
          </div>

          <p className="mt-8 mb-4 text-sm text-brand-dark/60" aria-live="polite">
            {designs.length} {active.label.toLowerCase()} {designs.length === 1 ? 'design' : 'designs'} · tap one to preview
          </p>

          {/* Designs */}
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8">
            {designs.map((template, index) => {
              const occasion = active.id === 'standard' ? occasionLabel(template) : undefined;
              return (
                <li key={template.id}>
                  <button
                    type="button"
                    onClick={() => open(template)}
                    aria-haspopup="dialog"
                    className="group block w-full text-left cursor-pointer rounded-[1.25rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9a7544]"
                  >
                    <span className="relative block aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-[#ece6dc] shadow-md shadow-brand-dark/10 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-brand-dark/20">
                      <img
                        src={thumbUrl(template)}
                        alt=""
                        width="420"
                        height="560"
                        loading={index < 4 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {occasion && (
                        <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-brand-dark">
                          {occasion}
                        </span>
                      )}
                      {template.isVideo && (
                        <span className="absolute inset-0 grid place-items-center">
                          <span className="grid place-items-center w-14 h-14 rounded-full bg-white/90 text-brand-dark shadow-lg"><Play className="w-6 h-6 ml-0.5" fill="currentColor" /></span>
                        </span>
                      )}
                      <span className="absolute inset-x-0 bottom-0 flex justify-center pb-3 pt-10 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-dark">
                          <Eye className="w-4 h-4" /> Preview
                        </span>
                      </span>
                    </span>
                    <span className="block mt-3 px-1">
                      <span className="block font-serif text-lg sm:text-xl leading-snug text-brand-dark">{template.title}</span>
                      <span className="block text-sm text-brand-dark/60 mt-0.5">{active.price}{active.id === 'fan' ? ' / piece' : ''}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Nothing fits? One clear way out. */}
        <div className="mt-14 rounded-[1.5rem] border border-dashed border-brand-dark/20 px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-brand-dark/75">
            <span className="block font-serif text-xl text-brand-dark">Can’t decide, or want something made just for you?</span>
            <span className="block text-sm font-light mt-1">Message us — we’ll help you choose, or design it from scratch.</span>
          </p>
          <a
            href={getOrderUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOrderStart({}, 'showcase_help')}
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full border border-brand-dark/25 bg-white px-6 py-3 text-sm font-medium text-brand-dark hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Ask us on WhatsApp
          </a>
        </div>
      </div>

      <DesignPreview
        template={selected}
        type={active}
        position={selectedIndex + 1}
        total={designs.length}
        onClose={close}
        onStep={step}
      />
    </section>
  );
}
