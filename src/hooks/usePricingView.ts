import { useEffect, useRef } from 'react';
import { trackEvent } from '../lib/telemetry';

export function usePricingView() {
  const ref = useRef<HTMLElement>(null);
  const tracked = useRef(false);
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      if (!tracked.current && entries.some((entry) => entry.isIntersecting)) {
        tracked.current = true;
        trackEvent('pricing_viewed', {});
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}
