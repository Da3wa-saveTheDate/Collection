import { Check, MessageCircle } from 'lucide-react';
import { getOrderUrl, trackOrderStart, type InvitationPackage } from '../../lib/order';

export default function Pricing() {
  const plans: Array<{
    name: string;
    price: string;
    description: string;
    package: InvitationPackage;
    isRecommended?: boolean;
    features: string[];
  }> = [
    {
      name: 'Standard',
      price: '800 ج.م',
      package: 'standard',
      description: 'اختيار مناسب من التشكيلة الأساسية لدعوتك الرقمية.',
      features: [
        'اختاري من التصاميم القياسية',
        'تخصيص بيانات المناسبة',
        'رابط جاهز للمشاركة',
        'تسليم خلال 72 ساعة',
      ],
    },
    {
      name: 'Premium',
      price: '1,000 ج.م',
      package: 'premium',
      description: 'للتصاميم المميزة ولمسات تخصيص إضافية تناسب مناسبتك.',
      isRecommended: true,
      features: [
        'اختاري من تصاميم Premium',
        'تخصيص متقدم بحسب التصميم',
        'رابط جاهز للمشاركة',
        'تسليم خلال 72 ساعة',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white relative" dir="rtl">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-20 reveal-on-scroll">
          <p className="text-sm font-medium tracking-wide text-brand-accent mb-3">باقات واضحة بدون مفاجآت</p>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">اختاري الباقة المناسبة</h2>
          <p className="text-lg text-brand-dark/70 font-light">
            كل الطلبات يتم تسليمها خلال 72 ساعة. شاهدي التصميم ثم أرسلي طلبك مباشرة على واتساب.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
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
                  الأكثر اختياراً
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
              
              <a
                href={getOrderUrl({ package: plan.package })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOrderStart({ package: plan.package })}
                className={`w-full py-4 rounded-full font-medium transition-all mb-8 ${
                  plan.isRecommended 
                    ? 'bg-brand-accent text-brand-dark hover:bg-brand-accent-hover' 
                    : 'bg-white text-brand-dark border border-brand-dark/20 hover:border-brand-dark hover:bg-brand-dark hover:text-white'
                } flex items-center justify-center gap-2`}
              >
                <MessageCircle className="w-5 h-5" />
                اطلبي باقة {plan.name}
              </a>
              
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
