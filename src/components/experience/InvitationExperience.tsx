/**
 * "The Unfolding" — a scroll-told chapter of the Ajwaa site.
 *
 * A sticky, full-viewport WebGL canvas holds one invitation in the centre of
 * the screen while the chapters below scroll past it. Scroll poses the card
 * (see experienceConfig.ts) and, at the end, docks it into the featured
 * package card's empty slot.
 *
 * Layering inside the section (back → front):
 *   backdrop gradient → hero wordmark → canvas + grain → text content
 */
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from '@sentry/react';
import { ArrowDown, ArrowRight, MessageCircle } from 'lucide-react';
import { getOrderUrl, isPremiumOfferActive, premiumOffer, trackOrderStart, type InvitationPackage } from '../../lib/order';
import './invitation-experience.css';

const InvitationScene = lazy(() => import('./InvitationScene'));

type Support = 'pending' | 'on' | 'off';

function supportsWebGL2() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}

const fallbackImage = `${import.meta.env.BASE_URL}celestial-love/images/hero.webp`;

export default function InvitationExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [support, setSupport] = useState<Support>('pending');
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();
  const premiumOfferActive = isPremiumOfferActive();
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    setRoot(element);
    setSupport(supportsWebGL2() ? 'on' : 'off');

    // Download three.js only when the story is about to arrive…
    const near = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setMounted(true); near.disconnect(); }
    }, { rootMargin: '120% 0px' });
    // …and render only while any part of it is on screen.
    const visible = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    near.observe(element);
    visible.observe(element);
    return () => { near.disconnect(); visible.disconnect(); };
  }, []);

  const packages: Array<{
    id: InvitationPackage; label: string; name: string; price: string; wasPrice?: string; note: string; featured?: boolean;
  }> = [
    { id: 'simple', label: 'The Essential', name: 'Simple Invitation', price: 'EGP 600', note: 'A polished single-page invitation from the simple collection.' },
    {
      id: 'premium', label: premiumOfferActive ? 'Limited offer' : 'Most chosen', name: 'Premium Invitation', featured: true,
      price: premiumOfferActive ? premiumOffer.price : premiumOffer.regularPrice,
      wasPrice: premiumOfferActive ? premiumOffer.regularPrice : undefined,
      note: 'Our premium designs, with an opening reveal and enhanced personal touches.',
    },
    { id: 'video', label: 'In motion', name: 'Video Invitation', price: 'EGP 1,400', note: 'A cinematic invitation with your names, details and music.' },
  ];

  const show3D = support === 'on';

  return (
    <section
      ref={rootRef}
      id="experience"
      className="xp"
      data-3d={support}
      data-ready={ready}
      aria-label="The Ajwaa invitation, unfolded"
    >
      <div className="xp__backdrop" aria-hidden="true" />
      <div className="xp__wordmark" aria-hidden="true"><span>AJWAA</span></div>

      <div className="xp__stage" aria-hidden="true">
        {show3D && mounted && root && (
          <ErrorBoundary fallback={<></>} onError={() => setSupport('off')}>
            <Suspense fallback={null}>
              <InvitationScene root={root} active={active} reducedMotion={reducedMotion} onReady={onReady} />
            </Suspense>
          </ErrorBoundary>
        )}
        {show3D && !ready && (
          <div className="xp__loader"><span className="xp__loader-ring" /><span className="xp__label">Unfolding your invitation</span></div>
        )}
        <div className="xp__grain" />
      </div>

      <div className="xp__content">
        {/* 1 — Hero */}
        <div className="xp__chapter xp__chapter--hero" data-xp-section="hero">
          <p className="xp__label xp__hero-eyebrow">The Ajwaa Collection · An invitation, unfolded</p>
          <img className="xp__poster" src={fallbackImage} alt="" width="280" height="440" loading="lazy" decoding="async" />
          <div className="xp__hero-foot">
            <h2 className="xp__hero-title">The first moment <em>of your celebration.</em></h2>
            <p className="xp__label xp__scroll-cue"><ArrowDown size={14} aria-hidden="true" /> Scroll to unfold</p>
          </div>
        </div>

        {/* 2 — Origin */}
        <div className="xp__chapter xp__chapter--left" data-xp-section="atelier">
          <div className="xp__copy">
            <p className="xp__label">01 — The atelier</p>
            <h2 className="xp__heading">Every invitation begins as a blank page.</h2>
            <div className="xp__gap" data-xp-focus aria-hidden="true" />
            <p className="xp__body">
              Proportion, typography and colour are composed like fine stationery, then brought to life for the
              screen your guests will hold. Arches, foil and wax — the ceremony of paper, carried into a link.
            </p>
            <dl className="xp__facts">
              <div><dt>72h</dt><dd>From details to delivery</dd></div>
              <div><dt>1 link</dt><dd>For every guest</dd></div>
              <div><dt>4 forms</dt><dd>Web · Video · Card · Fan</dd></div>
            </dl>
          </div>
        </div>

        {/* 3 — Notes */}
        <div className="xp__chapter xp__chapter--right" data-xp-section="details">
          <div className="xp__copy">
            <p className="xp__label">02 — The details</p>
            <h2 className="xp__heading">Written in three movements.</h2>
            <div className="xp__gap" data-xp-focus aria-hidden="true" />
            <ol className="xp__notes">
              <li><span className="xp__label">The reveal</span><p>An opening that turns a message into an occasion — a seal, a curtain, a first glimpse.</p></li>
              <li><span className="xp__label">The story</span><p>Your names, your date and the words you choose, set in lettering made for your theme.</p></li>
              <li><span className="xp__label">The reply</span><p>The time, the place and every detail your guests need, gathered in one elegant link.</p></li>
            </ol>
          </div>
        </div>

        {/* 4 — Process */}
        <div className="xp__chapter xp__chapter--left" data-xp-section="process">
          <div className="xp__copy">
            <p className="xp__label">03 — The process</p>
            <h2 className="xp__heading">From one message to every guest.</h2>
            <div className="xp__gap" data-xp-focus aria-hidden="true" />
            <p className="xp__body">
              Choose a design and send your details on WhatsApp. We confirm everything with you, finish the piece by
              hand, and return a share-ready invitation within 72 hours.
            </p>
            <ol className="xp__steps">
              <li><span>i.</span>Choose a design</li>
              <li><span>ii.</span>Send your details</li>
              <li><span>iii.</span>Confirm together</li>
              <li><span>iv.</span>Receive &amp; share</li>
            </ol>
          </div>
        </div>

        {/* 5 — Packages, with the dock slot */}
        <div className="xp__chapter xp__chapter--packages" data-xp-section="packages">
          <header className="xp__packages-head">
            <p className="xp__label">04 — Choose your invitation</p>
            <h2 className="xp__heading">Reserve your date.</h2>
          </header>
          <div className="xp__packages">
            {packages.map(item => (
              <article key={item.id} className={`xp__package${item.featured ? ' xp__package--featured' : ''}`}>
                <div className="xp__package-media">
                  {item.featured ? (
                    // The 3D invitation lands exactly inside this empty slot.
                    <div className="xp__slot" data-xp-slot>
                      <img src={fallbackImage} alt="" width="160" height="240" loading="lazy" decoding="async" />
                    </div>
                  ) : (
                    <div className="xp__frame"><span>{item.id === 'video' ? '▶' : 'Aa'}</span></div>
                  )}
                </div>
                <p className="xp__label">{item.label}</p>
                <h3 className="xp__package-name">{item.name}</h3>
                <p className="xp__package-note">{item.note}</p>
                <p className="xp__price">
                  {item.wasPrice && <s>{item.wasPrice}</s>}
                  {item.price}
                </p>
                <a
                  className="xp__reserve"
                  href={getOrderUrl({ package: item.id })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOrderStart({ package: item.id }, 'experience')}
                >
                  <MessageCircle size={16} aria-hidden="true" /> Reserve on WhatsApp
                </a>
              </article>
            ))}
          </div>
          <a className="xp__compare" href="#pricing">Compare all seven packages <ArrowRight size={14} aria-hidden="true" /></a>
        </div>

        {/* 6 — Minimal close */}
        <div className="xp__outro">
          <p className="xp__outro-line">Made for your moment.</p>
          <p className="xp__label">Ajwaa · Digital invitations · Delivered within 72 hours</p>
        </div>
      </div>
    </section>
  );
}
