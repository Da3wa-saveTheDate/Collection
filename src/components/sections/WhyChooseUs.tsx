import { Heart, Smartphone, Zap, Shield, PenTool, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'تصميم مناسب للموبايل',
    description: 'دعوة سهلة الفتح والمشاركة مع كل ضيوفك من أي موبايل.'
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: 'تفاصيلك هي الأساس',
    description: 'نضيف أسماءكم وتفاصيل المناسبة على التصميم الذي اخترتيه.'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'جاهزة خلال 72 ساعة',
    description: 'بعد تأكيد التفاصيل، يصلك رابط دعوتك جاهزاً للمشاركة.'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'خطوات طلب بسيطة',
    description: 'اختاري التصميم وأرسلي التفاصيل على واتساب في رسالة واحدة.'
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'مناسبة لكل احتفال',
    description: 'زفاف، خطوبة أو مناسبة خاصة — اختاري الستايل الذي يشبهكم.'
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'لمسة مميزة لضيوفك',
    description: 'التفاصيل والحركة تجعل الدعوة تجربة لا تُنسى من أول فتح للرابط.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-brand-light relative overflow-hidden" dir="rtl">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-brand-accent/10 rounded-full mix-blend-multiply filter blur-[80px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">دعوة أجمل وأسهل</h2>
          <p className="text-lg text-brand-dark/70 font-light">
            اختاري من المجموعة وخلّي تفاصيل مناسبتك تظهر بطريقتك.
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
