import { useEffect, useRef } from 'react';

/**
 * Hook that sets up an IntersectionObserver to add 'is-visible' class
 * to elements with 'reveal-on-scroll'. Automatically picks up new elements
 * added to the DOM via a MutationObserver.
 */
export function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create the IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    const observeAll = () => {
      document.querySelectorAll('.reveal-on-scroll:not(.is-visible)').forEach((el) => {
        observerRef.current?.observe(el);
      });
    };

    // Observe existing elements
    observeAll();

    // Watch for new elements added to the DOM
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observerRef.current?.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
