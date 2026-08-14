export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'اختاري التصميم',
      description: 'شاهدي النماذج واختاري التصميم الأقرب لذوقك ومناسبتك.'
    },
    {
      number: '02',
      title: 'ارسلي الطلب على واتساب',
      description: 'الرسالة تفتح تلقائياً باسم التصميم والباقة، ثم أضيفي تفاصيل المناسبة.'
    },
    {
      number: '03',
      title: 'نراجع التفاصيل',
      description: 'نؤكد معك البيانات المطلوبة قبل تجهيز نسختك النهائية.'
    },
    {
      number: '04',
      title: 'استلمي وشاركي',
      description: 'دعوتك الرقمية تكون جاهزة خلال 72 ساعة لتشاركيها مع ضيوفك.'
    }
  ];

  return (
    <section id="process" className="py-24 bg-brand-dark text-brand-light relative" dir="rtl">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-20 reveal-on-scroll">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">كيف تطلبي دعوتك؟</h2>
          <p className="text-lg text-white/70 font-light">
            أربع خطوات بسيطة من اختيارك للتصميم إلى مشاركة دعوتك مع ضيوفك.
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
