export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Choose a Design',
      description: 'Browse the collection and choose the design that best fits your occasion.'
    },
    {
      number: '02',
      title: 'Send Your Order on WhatsApp',
      description: 'Your message opens with the design and package already selected. Add your event details and send.'
    },
    {
      number: '03',
      title: 'Confirm the Details',
      description: 'We confirm the information needed before preparing your final invitation.'
    },
    {
      number: '04',
      title: 'Receive & Share',
      description: 'Your digital invitation is ready within 72 hours to share with your guests.'
    }
  ];

  return (
    <section id="process" className="py-24 bg-brand-dark text-brand-light relative">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-20 reveal-on-scroll">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">How It Works</h2>
          <p className="text-lg text-white/70 font-light">
            Four simple steps from choosing your design to sharing your invitation with guests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-[1px] bg-white/20 z-0"></div>

          {steps.map((step, index) => (
            <div key={index} className={`relative z-10 reveal-on-scroll delay-${(index + 1) * 100}`}>
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-brand-dark border border-white/20 flex items-center justify-center mb-6 shadow-xl text-3xl font-serif text-brand-accent">
                  {step.number}
                </div>
                <h3 className="text-xl font-medium text-white mb-4">{step.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
