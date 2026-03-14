export type OfferStatus = 'Active' | 'Expired' | 'Planned';

export interface Offer {
  id: number;
  name: string;
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
  brand: string;
}

export interface OfferGroup {
  id: number;
  name: string;
  expanded: boolean;
  children: OfferGroup[];
  products: OfferProduct[];
}

export interface PendingProductChange {
  code: string;
  brand: string;
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
