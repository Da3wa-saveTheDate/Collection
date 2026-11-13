/**
 * How it works — a short strip right under the hero, so visitors know the
 * whole journey before they start browsing. It is the only place the steps
 * are spelled out in full.
 */
const steps = [
  {
    title: 'Choose a design',
    description: 'Browse the collection and preview any design live on a phone.',
  },
  {
    title: 'Order on WhatsApp',
    description: 'Your message opens with the design already written. Add your names, date and details.',
  },
  {
    title: 'We confirm with you',
    description: 'We check every detail with you before preparing the final invitation.',
  },
  {
    title: 'Receive & share',
    description: 'Your invitation is ready within 72 hours to send to your guests.',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-14 md:py-16 bg-white border-y border-brand-dark/5">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <h2 className="text-sm font-sans font-medium tracking-wide text-[#8c7457] mb-8">How it works — four steps</h2>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-7">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-4 lg:flex-col lg:gap-5">
              <div className="flex items-center gap-4 shrink-0">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-brand-dark text-brand-accent font-serif text-lg shrink-0">
                  {index + 1}
                </span>
                {/* Connector to the next step (desktop only) */}
                {index < steps.length - 1 && <span className="hidden lg:block h-px flex-1 w-full bg-brand-dark/15" aria-hidden="true" />}
              </div>
              <div>
                <h3 className="font-sans text-lg font-medium text-brand-dark">{step.title}</h3>
                <p className="text-brand-dark/65 font-light leading-relaxed mt-1">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
