// ─── Store mock data ───────────────────────────────────────────────────────────

export interface OpeningHours {
  day: string;
  from: string;
  to: string;
  closed: boolean;
}

export interface StoreException {
  id: number;
  date: Date | null;
  from: string;
  to: string;
  closed: boolean;
  reason: Record<string, string>;
}

export const MOCK_STORE = {
  name: 'Utrecht',
  abbreviation: 'UTR',
  slug: 'showroom_utr',
  active: true,
  mainStore: false,
  outlet: false,
  openingSoon: false,
  pickupLocation: 'Utrecht',
  sites: ['sanitairwinkel_nl'],
  // Address
  country: 'NL',
  street: 'Koningin Julianaplein',
  houseNumber: '10',
  addition: '',
  postalCode: '3527 KB',
  city: 'Utrecht',
  addressNote: '',
  // Contact
  phoneCountry: 'NL',
  phoneNumber: '30 123 4567',
  email: 'utrecht@sanitairwinkel.nl',
  // Other
  latitude: '52.091',
  longitude: '5.122',
  promotionPage: 'Showroom Utrecht',
  googleCode: '17',
  seoTitle: 'Sanitairwinkel Utrecht – Dé badkamershowroom in Utrecht',
  seoDescription:
    'Bezoek onze ruime showroom in Utrecht en laat je inspireren door honderden badkameropstellingen. Onze specialisten helpen je graag verder.',
  introText:
    'Welkom bij Sanitairwinkel Utrecht. Onze showroom aan het Koningin Julianaplein biedt een inspirerende omgeving met de nieuwste badkamercollecties van toonaangevende merken.',
  heroImage: 'https://placehold.co/1200x500/e5e7eb/9ca3af?text=Hero+afbeelding',
  overviewImage: 'https://placehold.co/800x500/e5e7eb/9ca3af?text=Overzicht+afbeelding',
  google360Tour: '',
  youtubeVideo: 'https://youtu.be/6LyszVQsTbk',
  atmosphereImages: [
    'https://placehold.co/800x500/e5e7eb/9ca3af?text=Sfeerimpressie+1',
    'https://placehold.co/800x500/e5e7eb/9ca3af?text=Sfeerimpressie+2',
    '',
    '',
  ],
};

export const MOCK_OPENING_HOURS: OpeningHours[] = [
  { day: 'Maandag', from: '09:00', to: '17:30', closed: false },
  { day: 'Dinsdag', from: '09:00', to: '17:30', closed: false },
  { day: 'Woensdag', from: '09:00', to: '17:30', closed: false },
  { day: 'Donderdag', from: '09:00', to: '20:00', closed: false },
  { day: 'Vrijdag', from: '09:00', to: '17:30', closed: false },
  { day: 'Zaterdag', from: '10:00', to: '17:00', closed: false },
  { day: 'Zondag', from: '', to: '', closed: true },
];

export const MOCK_EXCEPTIONS: StoreException[] = [
  { id: 1, date: new Date(2026, 3, 5), from: '', to: '', closed: true, reason: { sanitairwinkel_nl: '1e Paasdag' } },
  { id: 2, date: new Date(2026, 3, 6), from: '12:00', to: '17:00', closed: false, reason: { sanitairwinkel_nl: 'Koopzondag (Pasen)' } },
  { id: 3, date: new Date(2026, 3, 27), from: '', to: '', closed: true, reason: { sanitairwinkel_nl: 'Koningsdag' } },
  { id: 4, date: new Date(2026, 4, 5), from: '10:00', to: '17:00', closed: false, reason: { sanitairwinkel_nl: 'Bevrijdingsdag' } },
  { id: 5, date: new Date(2026, 4, 14), from: '', to: '', closed: true, reason: { sanitairwinkel_nl: 'Hemelvaartsdag' } },
  { id: 6, date: new Date(2026, 10, 27), from: '09:00', to: '21:00', closed: false, reason: { sanitairwinkel_nl: 'Black Friday' } },
  { id: 7, date: new Date(2026, 11, 5), from: '10:00', to: '17:00', closed: false, reason: { sanitairwinkel_nl: 'Pakjesavond' } },
  { id: 8, date: new Date(2026, 11, 24), from: '09:00', to: '15:00', closed: false, reason: { sanitairwinkel_nl: 'Kerstavond' } },
  { id: 9, date: new Date(2026, 11, 25), from: '', to: '', closed: true, reason: { sanitairwinkel_nl: '1e Kerstdag' } },
  { id: 10, date: new Date(2026, 11, 26), from: '', to: '', closed: true, reason: { sanitairwinkel_nl: '2e Kerstdag' } },
  { id: 11, date: new Date(2026, 11, 31), from: '09:00', to: '15:00', closed: false, reason: { sanitairwinkel_nl: 'Oudjaarsdag' } },
];
