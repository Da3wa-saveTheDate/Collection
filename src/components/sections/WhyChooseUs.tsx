import { Heart, Smartphone, Zap, Shield, PenTool, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile First Design",
    description: "Flawless experience on any device, ensuring your guests can view your invitation anywhere."
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: "Fully Customizable",
    description: "Personalize every detail from typography and colors to music and animations."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Delivery",
    description: "Share your beautiful digital invitation via WhatsApp, Email, or SMS instantly."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Private",
    description: "Your moments are yours. Advanced privacy settings protect your event details."
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "RSVP Management",
    description: "Effortlessly track guest responses, dietary requirements, and plus-ones in real time."
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Premium Animations",
    description: "Delight your guests with smooth, cinematic micro-interactions and scroll effects."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-brand-light relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-brand-accent/10 rounded-full mix-blend-multiply filter blur-[80px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">Experience the Difference</h2>
          <p className="text-lg text-brand-dark/70 font-light">
            We merge cutting-edge technology with timeless design to provide an unparalleled digital invitation experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center text-center p-6 rounded-[2rem] hover:bg-white transition-colors duration-500 reveal-on-scroll delay-${(index % 3 + 1) * 100}`}
            >
              <div className="w-16 h-16 rounded-full bg-brand-dark text-brand-accent flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium text-brand-dark mb-3">{feature.title}</h3>
              <p className="text-brand-dark/60 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
