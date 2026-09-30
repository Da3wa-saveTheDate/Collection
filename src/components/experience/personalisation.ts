/**
 * Visitor personalisation shared by the DOM (form, order links) and the 3D
 * phone (screen artwork). Deliberately memory-only: names and dates are never
 * written to storage or sent to analytics — they only travel inside the
 * visitor's own WhatsApp message.
 */
import { useSyncExternalStore } from 'react';

export type DesignPalette = {
  paper: string;
  ink: string;
  muted: string;
  button: string;
  /** Wax seal gradient: highlight → shadow. */
  seal: [string, string];
};

export type InvitationDesign = {
  /** Catalogue id (matches the template folder). */
  id: string;
  /** Catalogue title, used as "Selected design" in the WhatsApp order. */
  title: string;
  /** Phone-sized artwork in /public/experience. */
  photo: string;
  palette: DesignPalette;
};

/** Premium designs offered by the switcher — they match the featured Premium package. */
export const DESIGNS: InvitationDesign[] = [
  {
    id: 'new_prem5', title: 'Elegant Moments', photo: 'experience/elegant-moments.webp',
    palette: { paper: '#f6efe4', ink: '#3a2a22', muted: '#8c6d49', button: '#6a1320', seal: ['#9a2836', '#4f0d16'] },
  },
  {
    id: 'eleganza', title: 'Eleganza', photo: 'experience/eleganza.webp',
    palette: { paper: '#f5f2ea', ink: '#33372b', muted: '#7d8467', button: '#66774f', seal: ['#93a47c', '#4f5d39'] },
  },
  {
    id: 'papercraft', title: 'Papercraft', photo: 'experience/papercraft.webp',
    palette: { paper: '#f8f0e6', ink: '#3d2b22', muted: '#9a6b4f', button: '#a4553b', seal: ['#c77358', '#7e3a26'] },
  },
  {
    id: 'new_ss', title: 'Seaside Celebration', photo: 'experience/seaside-celebration.webp',
    palette: { paper: '#f2f4f0', ink: '#2c3833', muted: '#6d8378', button: '#4a6b64', seal: ['#7fa39a', '#3a5750'] },
  },
];

export type Personalisation = {
  first: string;
  second: string;
  /** yyyy-mm-dd from <input type="date">, or '' for the sample date. */
  date: string;
  designId: string;
  /** True once the visitor picked a design themselves (only then is it named in orders). */
  designChosen: boolean;
};

export const SAMPLE = { first: 'Laila', second: 'Omar' } as const;
/** Visitors can pick dates from today up to this many years ahead. */
export const MAX_YEARS_AHEAD = 5;
const MAX_NAME = 18;

let state: Personalisation = { first: '', second: '', date: '', designId: DESIGNS[0].id, designChosen: false };
const listeners = new Set<() => void>();

export function getPersonalisation() {
  return state;
}

export function updatePersonalisation(patch: Partial<Personalisation>) {
  const next = { ...state, ...patch };
  next.first = next.first.slice(0, MAX_NAME);
  next.second = next.second.slice(0, MAX_NAME);
  state = next;
  listeners.forEach(listener => listener());
}

export function subscribePersonalisation(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function usePersonalisation() {
  return useSyncExternalStore(subscribePersonalisation, getPersonalisation, getPersonalisation);
}

export function designFor(value: Personalisation) {
  return DESIGNS.find(design => design.id === value.designId) ?? DESIGNS[0];
}

/** yyyy-mm-dd for a local date. */
export function isoDay(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

/** Selectable range for the date input: today … MAX_YEARS_AHEAD years from now. */
export function dateRange(now = new Date()) {
  const latest = new Date(now);
  latest.setFullYear(now.getFullYear() + MAX_YEARS_AHEAD);
  return { min: isoDay(now), max: isoDay(latest) };
}

/** Whether the typed date can be used. Past or far-off dates are rejected, not silently kept. */
export function dateStatus(date: string, now = new Date()): 'empty' | 'valid' | 'past' | 'far' {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return 'empty';
  const { min, max } = dateRange(now);
  if (date < min) return 'past';
  if (date > max) return 'far';
  return 'valid';
}

/**
 * Sample date shown before the visitor picks one: the first Saturday at least
 * ~10 weeks away, so the demo countdown never runs out.
 */
function sampleDate(now = new Date()) {
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 70);
  date.setDate(date.getDate() + ((6 - date.getDay() + 7) % 7));
  return isoDay(date);
}

/** Everything the phone screens need to draw, with sample fallbacks. */
export function screenContent(value: Personalisation) {
  const first = value.first.trim() || SAMPLE.first;
  const second = value.second.trim() || SAMPLE.second;
  // Parse as a local calendar day at 7 pm, so countdowns do not drift by timezone.
  const [year, month, day] = (dateStatus(value.date) === 'valid' ? value.date : sampleDate()).split('-').map(Number);
  const event = new Date(year, month - 1, day, 19, 0, 0);
  return {
    first,
    second,
    names: `${first} & ${second}`,
    event,
    longDate: new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(event),
    shortDate: `${String(day).padStart(2, '0')} · ${String(month).padStart(2, '0')} · ${year}`,
    design: designFor(value),
  };
}

export type ScreenContent = ReturnType<typeof screenContent>;

/** Details for the WhatsApp message; only what the visitor actually entered. */
export function orderDetails(value: Personalisation) {
  const first = value.first.trim();
  const second = value.second.trim();
  const names = first && second ? `${first} & ${second}` : first || second || undefined;
  const date = dateStatus(value.date) === 'valid' ? screenContent(value).longDate : undefined;
  return names || date ? { names, date } : undefined;
}
