export interface OrdersAddStep {
  label: string;
}

export interface CartItem {
  naam: string;
  productcode: string;
  levertijd: string;
  voorraad: number;
  aantal: number;
  prijs: number;
  imageUrl?: string;
  discountPercent: number;
  discountAmount: number;
  prijscorrectie: boolean;
}

export interface CartGroup {
  id: string;
  name: string;
  items: CartItem[];
}

export type FinalizeMode = 'offerte' | 'bestelling' | null;
