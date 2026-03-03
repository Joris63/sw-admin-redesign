/** Format a number as Euro price: "€ 1.234,56" */
export function formatPrice(value: number): string {
  return '€\u00a0' + value.toFixed(2).replace('.', ',');
}

/** Format a number as currency with NL locale: "1.234,56" */
export function formatCurrency(value: number): string {
  return value.toLocaleString('nl-NL', { minimumFractionDigits: 2 });
}

/** Parse a date string in DD-MM-YYYY format */
export function parseDMY(s: string): Date | null {
  const [d, m, y] = s.split('-').map(Number);
  return isNaN(d) ? null : new Date(y, m - 1, d);
}

export const MONTHS = [
  'Januari',
  'Februari',
  'Maart',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Augustus',
  'September',
  'Oktober',
  'November',
  'December',
];
