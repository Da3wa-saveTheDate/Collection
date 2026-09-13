import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { trackEvent } from '../lib/telemetry';
import { getOrderUrl, trackOrderStart } from '../lib/order';

const answers = [
  { id: 'ordering', question: 'How do I order?', answer: 'Choose a design and select its order button. WhatsApp opens with your selection ready. Send your message and our team will confirm the details.' },
  { id: 'delivery', question: 'When will it be ready?', answer: 'Our collection lists delivery within 72 hours. Contact us on WhatsApp to confirm the details and timing for your event.' },
  { id: 'pricing', question: 'Which package should I choose?', answer: 'Compare the invitation types and current prices in our pricing section. For a bespoke design, choose Customisation and ask our team for a quote.' },
];

export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [selected, setSelected] = useState<string>();
  const launcher = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const interacted = useRef(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      let dismissed = false;
      try { dismissed = sessionStorage.getItem('ajwaa-support-dismissed') === '1'; } catch { /* Storage is optional. */ }
      if (!dismissed && !interacted.current && document.visibilityState === 'visible') setPrompt(true);
    }, 30000);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => { if (open) closeButton.current?.focus(); }, [open]);

  function dismissPrompt() {
    setPrompt(false);
    try { sessionStorage.setItem('ajwaa-support-dismissed', '1'); } catch { /* Storage is optional. */ }
  }

  function show() {
    interacted.current = true;
    dismissPrompt();
    setOpen(true);
    trackEvent('support_opened', {});
  }

  function close() {
    setOpen(false);
    launcher.current?.focus();
  }

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-50 text-brand-dark" data-support-widget>
      {open && (
        <section id="ajwaa-support" aria-labelledby="support-title" onKeyDown={(event) => { if (event.key === 'Escape') close(); }}
          className="mb-3 w-[min(22rem,calc(100vw-2rem))] max-h-[70dvh] overflow-y-auto rounded-2xl border border-brand-dark/10 bg-white p-5 shadow-2xl">
          <div className="flex items-center justify-between gap-4">
            <h2 id="support-title" className="font-serif text-2xl">A little help from Ajwaa</h2>
            <button ref={closeButton} onClick={close} aria-label="Close help" className="p-2 rounded-full hover:bg-brand-light"><X size={20} /></button>
          </div>
          <p className="mt-2 mb-4 text-sm text-brand-dark/70">Instant answers to common questions. For personal help, speak with our team on WhatsApp.</p>
          <div className="space-y-2">
            {answers.map((item) => <div key={item.id}>
              <button aria-expanded={selected === item.id} aria-controls={`support-${item.id}`} className="w-full rounded-xl bg-brand-light px-4 py-3 text-left text-sm font-medium hover:bg-brand-accent/20"
                onClick={() => { setSelected(selected === item.id ? undefined : item.id); if (selected !== item.id) trackEvent('support_answer_viewed', { topic: item.id }); }}>
                {item.question}
              </button>
              {selected === item.id && <p id={`support-${item.id}`} className="px-3 py-3 text-sm leading-relaxed">{item.answer}</p>}
            </div>)}
          </div>
          <a href="#pricing" onClick={close} className="block mt-4 text-center text-sm underline underline-offset-4">Compare packages</a>
          <a href={getOrderUrl({})} target="_blank" rel="noopener noreferrer" onClick={() => trackOrderStart({}, 'support')}
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand-dark px-4 py-3 text-white text-sm font-medium"><MessageCircle size={18} />Talk to us on WhatsApp</a>
        </section>
      )}
      {prompt && !open && <div className="mb-3 flex max-w-[min(20rem,calc(100vw-2rem))] items-center gap-2 rounded-2xl bg-white border border-brand-dark/10 p-3 shadow-lg">
        <button onClick={show} className="text-left text-sm">Need a hand choosing your invitation?</button>
        <button onClick={dismissPrompt} aria-label="Dismiss help suggestion" className="p-2"><X size={18} /></button>
      </div>}
      <button ref={launcher} onClick={() => open ? close() : show()} aria-expanded={open} aria-controls="ajwaa-support"
        className="ml-auto flex items-center gap-2 rounded-full border border-white/20 bg-brand-dark px-5 py-3 text-white shadow-lg hover:bg-brand-dark/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent">
        <MessageCircle size={20} />Need help?
      </button>
    </div>
  );
}
