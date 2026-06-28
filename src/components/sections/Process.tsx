export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Select a Design",
      description: "Browse our premium collection and choose a template that perfectly captures your event's theme."
    },
    {
      number: "02",
      title: "Personalize Details",
      description: "Submit your event details, photos, and preferences. Our platform makes customization effortless."
    },
    {
      number: "03",
      title: "Review & Refine",
      description: "Receive a live preview link. We'll fine-tune the animations and layout until it's absolutely perfect."
    },
    {
      number: "04",
      title: "Share with Guests",
      description: "Send your digital invitation via any platform and watch the RSVPs seamlessly roll in."
    }
  ];

  return (
    <section id="process" className="py-24 bg-brand-dark text-brand-light relative">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-20 reveal-on-scroll">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">How It Works</h2>
          <p className="text-lg text-white/70 font-light">
            A seamless, stress-free process designed to give you a perfect invitation in just a few simple steps.
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
