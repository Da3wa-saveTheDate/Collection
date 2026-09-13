import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ErrorBoundary } from '@sentry/react';
import './hero-invitation-stage.css';

const RibbonField = lazy(() => import('./threeui/RibbonFieldBackground'));

export default function HeroInvitationStage() {
  const [motion, setMotion] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia('(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setMotion(media.matches && !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const reset = () => {
    stage.current?.style.setProperty('--tilt-x', '0deg');
    stage.current?.style.setProperty('--tilt-y', '0deg');
  };
  return (
    <div className="invitation-stage" ref={stage} data-motion={motion}
      onPointerMove={event => {
        if (!motion || event.pointerType !== 'mouse') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--tilt-y', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 8}deg`);
        event.currentTarget.style.setProperty('--tilt-x', `${((event.clientY - bounds.top) / bounds.height - 0.5) * -6}deg`);
      }} onPointerLeave={reset}>
      <div className="invitation-stage__atmosphere" aria-hidden="true">
        {motion && <ErrorBoundary fallback={<></>}><Suspense fallback={null}><RibbonField /></Suspense></ErrorBoundary>}
      </div>
      <div className="invitation-stage__eyebrow"><span />THE AJWAA COLLECTION<span /></div>
      <div className="invitation-stage__halo" aria-hidden="true" />
      <div className="invitation-stage__cards">
        <div className="invitation-stage__card invitation-stage__card--left">
          <img src={`${import.meta.env.BASE_URL}desert-rose/images/hero.webp`} alt="Desert Rose invitation preview" width="240" height="420" />
          <span>Desert Rose</span>
        </div>
        <div className="invitation-stage__card invitation-stage__card--right">
          <img src={`${import.meta.env.BASE_URL}emerald-noir/images/hero.webp`} alt="Emerald Noir invitation preview" width="240" height="420" />
          <span>Emerald Noir</span>
        </div>
        <a href="#designs" className="invitation-stage__card invitation-stage__card--front" aria-label="Explore the invitation collection">
          <img src={`${import.meta.env.BASE_URL}celestial-love/images/hero.webp`} alt="Celestial Love invitation preview" width="280" height="440" fetchPriority="high" />
          <span className="invitation-stage__card-caption"><span><small>A MOMENT, BEAUTIFULLY SHARED</small>Celestial Love</span><ArrowUpRight size={22} aria-hidden="true" /></span>
        </a>
      </div>
      <div className="invitation-stage__seal" aria-hidden="true"><span>A</span><small>MADE FOR<br />YOUR MOMENT</small></div>
      <p className="invitation-stage__note">Your story. A beautiful first impression.</p>
    </div>
  );
}
