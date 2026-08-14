export type InvitationPackage = 'customisation' | 'fan' | 'simple' | 'video';

type OrderSelection = {
  template?: string;
  category?: string;
  package?: InvitationPackage;
};

const whatsappNumber = '201042353785';

const packageDetails: Record<InvitationPackage, { name: string; price: string; value?: number }> = {
  customisation: { name: 'Customisation', price: 'Price on request' },
  fan: { name: 'Fan Invitation', price: 'EGP 15 per piece', value: 15 },
  simple: { name: 'Simple Invitation', price: 'EGP 600', value: 600 },
  video: { name: 'Video Invitation', price: 'EGP 1,400', value: 1400 },
};

export function getSuggestedPackage(category?: string): InvitationPackage {
  if (category === 'invitation fan') return 'fan';
  if (category === 'video-invitations') return 'video';
  if (category === 'simple-websites') return 'simple';
  return 'customisation';
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
    'Hello Ajwaa, I would like to order a digital invitation.',
    selection.template ? `Selected design: ${selection.template}` : 'I would like help choosing a design.',
    `Package: ${details.name} (${details.price})`,
    'Requested delivery: within 72 hours.',
    campaign ? `Visit source: ${campaign}` : 'Visit source: website.',
    '',
    'Event type:',
    'Event date:',
    'Names to include:',
  ].join('\n');

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function trackOrderStart(selection: OrderSelection = {}) {
  if (typeof window === 'undefined') return;

  const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq === 'function') {
    const selectedPackage = selection.package ?? getSuggestedPackage(selection.category);
    const details = packageDetails[selectedPackage];
    const eventData: Record<string, string | number> = {
      content_name: selection.template ?? 'Package inquiry',
      content_category: selection.category ?? selectedPackage,
      currency: 'EGP',
    };

    if (details.value !== undefined) {
      eventData.value = details.value;
    }

    fbq('track', 'Lead', eventData);
  }
}
