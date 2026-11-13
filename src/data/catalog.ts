/**
 * The catalogue: every invitation type (package) and every design, in one place.
 *
 * A design's `category` decides which invitation type it belongs to, so the
 * gallery tabs, the price list and the WhatsApp order message always agree.
 * Designs live in templates.json (also read by scripts/build-thumbs.mjs).
 */
import templateData from './templates.json';
import { getPackageDetails, getSuggestedPackage, isPremiumOfferActive, premiumOffer, type InvitationPackage } from '../lib/order';

export type Template = {
  /** Folder name of the live template in /public. */
  id: string;
  title: string;
  category: string;
  description: string;
  /** Original artwork, or the video file for video designs. */
  image: string;
  isVideo?: boolean;
};

export const templates: Template[] = templateData;

export type InvitationType = {
  id: InvitationPackage;
  /** Short name used on tabs and tags. */
  label: string;
  /** Full name, as written in the WhatsApp order. */
  name: string;
  price: string;
  /** Shown struck through while an offer is running. */
  regularPrice?: string;
  priceNote?: string;
  /** One line: what the customer receives. */
  summary: string;
  features: string[];
  designs: Template[];
};

const copy: Record<InvitationPackage, { label: string; summary: string; features: string[]; priceNote?: string }> = {
  premium: {
    label: 'Premium',
    summary: 'Our most detailed invitation websites, with an animated opening and extra personal touches.',
    features: ['Animated opening reveal', 'Your names, date and event details', 'One link to share with every guest'],
  },
  standard: {
    label: 'Standard',
    summary: 'A refined invitation website for weddings and engagements.',
    features: ['Wedding and engagement designs', 'Your names, date and event details', 'One link to share with every guest'],
  },
  simple: {
    label: 'Simple',
    summary: 'A polished single-page invitation website.',
    features: ['Clean single-page design', 'Your names, date and event details', 'One link to share with every guest'],
  },
  video: {
    label: 'Video',
    summary: 'A video invitation made with your names, event details and music.',
    features: ['Your names and event details', 'Music of your choice', 'A ready-to-share video invitation'],
  },
  card: {
    label: 'Card',
    summary: 'A personalised invitation card in the style you choose.',
    features: ['Your names, date and event details', 'A ready-to-share invitation card'],
  },
  fan: {
    label: 'Fan',
    summary: 'A printed fan invitation for your guests to keep.',
    features: ['Your names, date and event details', 'Order the quantity you need'],
    priceNote: 'per piece',
  },
  customisation: {
    label: 'Custom',
    summary: 'Something made only for you? Tell us your idea and we will send a quote before any work begins.',
    features: ['Created around your vision', 'A quote shared before work begins'],
    priceNote: 'Based on your requirements',
  },
};

/** Tab / price-list order: what most customers want first. */
const order: InvitationPackage[] = ['premium', 'standard', 'simple', 'video', 'card', 'fan', 'customisation'];

export function getInvitationTypes(): InvitationType[] {
  const offer = isPremiumOfferActive();
  return order.map((id) => {
    const details = getPackageDetails(id);
    return {
      id,
      label: copy[id].label,
      name: details.name,
      // "EGP 15 per piece" is split into price + note so the number stays easy to scan.
      price: details.price.replace(/ per piece$/, ''),
      regularPrice: id === 'premium' && offer ? premiumOffer.regularPrice : undefined,
      priceNote: id === 'premium' && offer
        ? `Offer ends ${premiumOffer.endLabel} · first ${premiumOffer.bookingLimit} bookings`
        : copy[id].priceNote,
      summary: copy[id].summary,
      features: copy[id].features,
      designs: id === 'customisation' ? [] : templates.filter((template) => getSuggestedPackage(template.category) === id),
    };
  });
}

/** Small thumbnail built by `npm run thumbs`. */
export function thumbUrl(template: Template) {
  return `${import.meta.env.BASE_URL}thumbs/${template.id}.webp`;
}

/** The live template, as guests would open it. */
export function templateUrl(template: Template) {
  return template.isVideo
    ? `${import.meta.env.BASE_URL}${template.image}`
    : `${import.meta.env.BASE_URL}${template.id}/`;
}

/** Only shown where a tab mixes occasions (Standard holds weddings and engagements). */
export function occasionLabel(template: Template) {
  if (template.category === 'engagement') return 'Engagement';
  if (template.category === 'wedding') return 'Wedding';
  return undefined;
}
