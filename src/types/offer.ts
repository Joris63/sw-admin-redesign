export type OfferStatus = 'Actief' | 'Verlopen' | 'Binnenkort gepland';

export interface Offer {
  id: number;
  naam: string;
  startdatum: string;
  einddatum: string;
  status: OfferStatus;
  sites: string[];
  lastTask: string | null;
}

export interface OfferProduct {
  id: number;
  code: string;
  site: string;
  merk: string;
}

export interface OfferGroup {
  id: number;
  naam: string;
  expanded: boolean;
  children: OfferGroup[];
  products: OfferProduct[];
}

export interface PendingProductChange {
  code: string;
  merk: string;
  action: 'add' | 'remove';
}

export interface PendingOptionChange {
  label: string;
  icon: string;
  action: 'add' | 'remove';
}

export interface PendingGroupChanges {
  groupAction?: 'add' | 'remove';
  options: PendingOptionChange[];
  products: PendingProductChange[];
}

export interface PendingSiteChange {
  site: string;
  action: 'add' | 'remove';
}
