export type InvitationPackage =
  | 'standard'
  | 'premium'
  | 'customisation'
  | 'fan'
  | 'card'
  | 'simple'
  | 'video';

type OrderSelection = {
  template?: string;
  category?: string;
  package?: InvitationPackage;
};

const whatsappNumber = '201042353785';

const packageDetails: Record<InvitationPackage, { name: string; price: string; value?: number }> = {
  standard: { name: 'Standard Invitation', price: 'EGP 800', value: 800 },
  premium: { name: 'Premium Invitation', price: 'EGP 1,000', value: 1000 },
  customisation: { name: 'Customisation', price: 'Price on request' },
  fan: { name: 'Fan Invitation', price: 'EGP 15 per piece', value: 15 },
  card: { name: 'Invitation Card', price: 'EGP 200', value: 200 },
  simple: { name: 'Simple Invitation', price: 'EGP 600', value: 600 },
  video: { name: 'Video Invitation', price: 'EGP 1,400', value: 1400 },
};

export function getSuggestedPackage(category?: string): InvitationPackage {
  if (category === 'invitation fan') return 'fan';
  if (category === 'invitation cards') return 'card';
  if (category === 'video-invitations') return 'video';
  if (category === 'simple-websites') return 'simple';
  if (category === 'premium-wedding') return 'premium';
  return 'standard';
}

export function getPackageLabel(category?: string) {
  const suggestedPackage = getSuggestedPackage(category);
  const details = packageDetails[suggestedPackage];
  return `${details.name} · ${details.price}`;
}

export function getOrderUrl(selection: OrderSelection = {}) {
  const selectedPackage = selection.package ?? (
    selection.category ? getSuggestedPackage(selection.category) : undefined
  );
  const details = selectedPackage ? packageDetails[selectedPackage] : undefined;
  const campaign = typeof window === 'undefined'
    ? null
    : new URLSearchParams(window.location.search).get('utm_campaign');

  const packageQuestions: Partial<Record<InvitationPackage, string[]>> = {
    fan: ['Quantity required:'],
    video: ['Photos or videos to include:', 'Preferred music:'],
    customisation: ['Customisation brief / preferred style:', 'Reference links, if any:'],
  };

  const message = [
    'Hello Ajwaa, I would like to order a digital invitation.',
    selection.template ? `Selected design: ${selection.template}` : 'I would like help choosing a design.',
    details ? `Package: ${details.name} (${details.price})` : 'Invitation type: I need help choosing.',
    'Requested delivery: within 72 hours.',
    campaign ? `Visit source: ${campaign}` : 'Visit source: website.',
    '',
    'Event type:',
    'Event date:',
    'Names to include:',
    ...(selectedPackage ? packageQuestions[selectedPackage] ?? [] : []),
  ].join('\n');

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function trackOrderStart(selection: OrderSelection = {}) {
  if (typeof window === 'undefined') return;

  const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq === 'function') {
    const selectedPackage = selection.package ?? (
      selection.category ? getSuggestedPackage(selection.category) : undefined
    );
    const details = selectedPackage ? packageDetails[selectedPackage] : undefined;
    const eventData: Record<string, string | number> = {
      content_name: selection.template ?? 'Package inquiry',
      content_category: selection.category ?? selectedPackage ?? 'general-inquiry',
      currency: 'EGP',
    };

    if (details?.value !== undefined) {
      eventData.value = details.value;
    }

    fbq('track', 'Lead', eventData);
  }
}
