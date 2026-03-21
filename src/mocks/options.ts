// ─── Shared dropdown option arrays ────────────────────────────────────────────
// Centralised here so components never define their own copies.
// Import only what you need:  import { SALUTATION_OPTIONS } from '@/mocks/options'

// ── Person / contact ────────────────────────────────────────────────────────

export const SALUTATION_OPTIONS = ['Fam.', 'Dhr.', 'Mevr.'];

export const CUSTOMER_TYPE_OPTIONS = ['Particulier', 'Zakelijk'];

/** Phone-country prefix options (label = display prefix, value = ISO-2 code) */
export const PHONE_COUNTRY_OPTIONS = [
  { label: '+31', value: 'NL' },
  { label: '+32', value: 'BE' },
  { label: '+33', value: 'FR' },
  { label: '+49', value: 'DE' },
];

// ── Company ──────────────────────────────────────────────────────────────────

export const COMPANY_TYPE_OPTIONS = ['Particulier', 'ZZP', 'MKB', 'Grootzakelijk'];

export const VAT_COUNTRY_OPTIONS = ['NL', 'BE', 'DE', 'FR'];

// ── Address / geography ──────────────────────────────────────────────────────

/** Country names (plain strings, used in plain <Select> without value mapping) */
export const COUNTRY_NAME_OPTIONS = ['Nederland', 'België', 'Duitsland', 'Frankrijk', 'Luxemburg'];

/** Country options with ISO-2 value (used where value != label) */
export const COUNTRY_CODE_OPTIONS = [
  { label: 'Nederland', value: 'NL' },
  { label: 'België', value: 'BE' },
  { label: 'Frankrijk', value: 'FR' },
  { label: 'Duitsland', value: 'DE' },
];

// ── Sales / order ────────────────────────────────────────────────────────────

/** Sales channel options (plain strings) */
export const CHANNEL_OPTIONS = ['Showroom', 'Telefoon', 'E-mail', 'Chat', 'Website'];

/** Sales channel options with values (used in orders wizard) */
export const CHANNEL_CODE_OPTIONS = [
  { label: 'Chat', value: 'chat' },
  { label: 'E-mail', value: 'email' },
  { label: 'Onbekend', value: 'onbekend' },
  { label: 'Online', value: 'online' },
  { label: 'Showroom', value: 'showroom' },
  { label: 'Telefoon', value: 'telefoon' },
  { label: 'Videogesprek', value: 'videogesprek' },
];

export const BRANCH_OPTIONS = ['Amsterdam', 'Rotterdam', 'Utrecht', 'Veenendaal', 'Den Haag'];

export const DEPARTMENT_OPTIONS = [
  { label: 'Verkoop', value: 'verkoop' },
  { label: 'Comm. Binnendienst', value: 'binnendienst' },
  { label: 'Verkoop zakelijk', value: 'verkoop-zakelijk' },
  { label: 'Klantenservice', value: 'klantenservice' },
  { label: 'Overig', value: 'overig' },
];

/** Showroom locations with numeric IDs (used in delivery / direct sale) */
export const SHOWROOM_OPTIONS = [
  { label: 'Rosmalen', value: 1 },
  { label: 'Tilburg', value: 2 },
  { label: 'Rotterdam', value: 3 },
  { label: 'Amsterdam', value: 4 },
];

/** Showroom names as plain strings (used in customer preferences) */
export const SHOWROOM_NAME_OPTIONS = ['Amsterdam', 'Rotterdam', 'Utrecht', 'Den Haag', 'Veenendaal'];

export const DESTINATION_OPTIONS = ['Klantadres', 'Showroom', 'Pickup Point'];

/** Payment methods for customer profile (invoice / account payments) */
export const PAYMENT_METHOD_OPTIONS = ['iDEAL', 'Bankoverschrijving', 'Creditcard', 'Klarna'];

/** Payment methods for point-of-sale / direct order */
export const POS_PAYMENT_METHOD_OPTIONS = ['Ideal', 'Contant', 'Creditcard', 'Pin', 'Anders'];

export const SHOW_PRICES_OPTIONS = ['Incl. BTW', 'Excl. BTW'];

// ── Customer settings ────────────────────────────────────────────────────────

export const REVIEW_INACTIVE_REASON_OPTIONS = ['Email vertraagd', 'Weigering', 'Overig'];

// ── Dates ────────────────────────────────────────────────────────────────────

/** Full Dutch month names (re-exported for consistency; also available as MONTHS in utils/format.ts) */
export const MONTH_OPTIONS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

/** Short month options used in planning selects */
export const MONTH_SHORT_OPTIONS = [
  { label: 'jan', value: 'jan' },
  { label: 'feb', value: 'feb' },
  { label: 'mrt', value: 'mrt' },
  { label: 'apr', value: 'apr' },
  { label: 'mei', value: 'mei' },
  { label: 'jun', value: 'jun' },
  { label: 'jul', value: 'jul' },
  { label: 'aug', value: 'aug' },
  { label: 'sep', value: 'sep' },
  { label: 'okt', value: 'okt' },
  { label: 'nov', value: 'nov' },
  { label: 'dec', value: 'dec' },
];

/** Returns an array of year strings starting from the current year */
export function getYearOptions(count = 6): string[] {
  const base = new Date().getFullYear();
  return Array.from({ length: count }, (_, i) => String(base + i));
}

// ── Store / logistics ────────────────────────────────────────────────────────

export const SITE_OPTIONS = [
  { label: 'sanitairwinkel.nl', value: 'sanitairwinkel_nl' },
  { label: 'sawiday.be', value: 'sawiday_be' },
  { label: 'sawiday.fr', value: 'sawiday_fr' },
  { label: 'sawiday.de', value: 'sawiday_de' },
];

export const PICKUP_LOCATION_OPTIONS = [
  'Alkmaar', 'Almere', 'Amsterdam Amstel', 'Amsterdam West', 'Arnhem',
  'Breda', 'Eindhoven', 'Groningen', 'Den Haag', 'Leeuwarden',
  'Leiden', 'Nijmegen', 'Rotterdam', 'Tilburg', 'Utrecht', 'Zwolle',
];

export const PROMOTION_PAGE_OPTIONS = [
  'Showroom Utrecht',
  'Showroom Amsterdam',
  'Showroom Rotterdam',
  'Showroom Den Haag',
];
