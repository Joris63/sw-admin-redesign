export interface OrdersAddStep {
  label: string;
}

export interface CartItem {
  name: string;
  productCode: string;
  deliveryTime: string;
  stock: number;
  quantity: number;
  price: number;
  imageUrl?: string;
  discountPercent: number;
  discountAmount: number;
  priceCorrection: boolean;
}

export interface CartGroup {
  id: string;
  name: string;
  items: CartItem[];
}

export type FinalizeMode = 'quotation' | 'order' | null;
