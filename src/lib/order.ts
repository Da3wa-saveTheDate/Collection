export type InvitationPackage = 'standard' | 'premium';

type OrderSelection = {
  template?: string;
  category?: string;
  package?: InvitationPackage;
};

const whatsappNumber = '201042353785';

const packageDetails: Record<InvitationPackage, { name: string; price: string }> = {
  standard: { name: 'Standard', price: '800 ج.م' },
  premium: { name: 'Premium', price: '1,000 ج.م' },
};

export function getSuggestedPackage(category?: string): InvitationPackage {
  return category === 'premium-wedding' ? 'premium' : 'standard';
}

export function getPackageLabel(category?: string) {
  const suggestedPackage = getSuggestedPackage(category);
  const details = packageDetails[suggestedPackage];
  return `${details.name} · ${details.price}`;
}

export function getOrderUrl(selection: OrderSelection = {}) {
  const selectedPackage = selection.package ?? getSuggestedPackage(selection.category);
  const details = packageDetails[selectedPackage];
  const campaign = typeof window === 'undefined'
    ? null
    : new URLSearchParams(window.location.search).get('utm_campaign');

  const message = [
    'أهلاً Ajwaa، أرغب في طلب دعوة رقمية.',
    selection.template ? `التصميم المختار: ${selection.template}` : 'أرغب في المساعدة لاختيار التصميم.',
    `الباقة: ${details.name} (${details.price})`,
    'موعد التسليم المطلوب: خلال 72 ساعة.',
    campaign ? `مصدر الزيارة: ${campaign}` : 'مصدر الزيارة: الموقع.',
    '',
    'نوع المناسبة:',
    'تاريخ المناسبة:',
    'الأسماء المراد كتابتها:',
  ].join('\n');

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function trackOrderStart(selection: OrderSelection = {}) {
  if (typeof window === 'undefined') return;

  const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq === 'function') {
    fbq('track', 'Lead', {
      content_name: selection.template ?? 'Package inquiry',
      content_category: selection.category ?? selection.package ?? 'website',
      value: selection.package === 'premium' ? 1000 : 800,
      currency: 'EGP',
    });
  }
}
