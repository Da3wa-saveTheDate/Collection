import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: "Standard",
      price: "$49",
      description: "Perfect for intimate gatherings and small events.",
      features: [
        "Choice of 5 premium templates",
        "Basic customization (text & colors)",
        "Standard RSVP form",
        "Mobile-optimized design",
        "Email support"
      ]
    },
    {
      name: "Premium",
      price: "$99",
      description: "Our most popular choice with advanced features.",
      isRecommended: true,
      features: [
        "Access to all templates",
        "Full customization + custom CSS",
        "Advanced RSVP with dietary reqs",
        "Background music integration",
        "Custom domain option",
        "Priority 24/7 support"
      ]
    },
    {
      name: "Bespoke",
      price: "$299",
      description: "A completely custom design built from scratch.",
      features: [
        "100% custom unique design",
        "Custom animations & illustrations",
        "Multiple event pages (e.g., Sangeet, Wedding)",
        "Guest list management dashboard",
        "Dedicated designer",
        "White-glove service"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-20 reveal-on-scroll">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">Investment Options</h2>
          <p className="text-lg text-brand-dark/70 font-light">
            Transparent pricing for every scale of celebration. Choose the package that fits your needs perfectly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-[2rem] p-8 md:p-10 transition-all duration-500 reveal-on-scroll delay-${(index + 1) * 100} ${
                plan.isRecommended 
                  ? 'bg-brand-dark text-white shadow-2xl scale-100 md:scale-105 z-10' 
                  : 'bg-brand-light text-brand-dark border border-brand-dark/5'
              }`}
            >
              {plan.isRecommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-brand-dark px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Recommended
                </div>
              )}
              
              <h3 className={`text-2xl font-serif mb-2 ${plan.isRecommended ? 'text-brand-accent' : 'text-brand-dark'}`}>
                {plan.name}
              </h3>
              <p className={`font-light mb-8 ${plan.isRecommended ? 'text-white/70' : 'text-brand-dark/60'}`}>
                {plan.description}
              </p>
              
              <div className="mb-8">
                <span className="text-5xl font-serif">{plan.price}</span>
              </div>
              
              <button 
                className={`w-full py-4 rounded-full font-medium transition-all mb-8 ${
                  plan.isRecommended 
                    ? 'bg-brand-accent text-brand-dark hover:bg-brand-accent-hover' 
                    : 'bg-white text-brand-dark border border-brand-dark/20 hover:border-brand-dark hover:bg-brand-dark hover:text-white'
                }`}
              >
                Choose {plan.name}
              </button>
              
              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${plan.isRecommended ? 'text-brand-accent' : 'text-brand-dark/60'}`} />
                    <span className={`text-sm ${plan.isRecommended ? 'text-white/80' : 'text-brand-dark/80'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
