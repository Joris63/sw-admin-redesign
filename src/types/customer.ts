export interface CustomerAddress {
  id: number;
  name: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  isDefaultDelivery: boolean;
  isDefaultInvoice: boolean;
}

export interface CustomerCartItem {
  id: number;
  name: string;
  productCode: string;
  quantity: number;
  price: number;
}

export interface WishlistItem {
  id: number;
  name: string;
  productCode: string;
  quantity: number;
  price: number;
}

export interface Wishlist {
  id: number;
  name: string;
  items: WishlistItem[];
}

export interface BrandDiscount {
  id: number;
  brand: string;
  discount: number;
  defaultDiscount: number;
}

export interface ProductDiscount {
  id: number;
  productCode: string;
  product: string;
  price: number;
  discountPrice: number;
}

export interface DeliveredItem {
  id: number;
  delivery: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  value: number;
  isOverdue: boolean;
}

export interface ReservedItem {
  id: number;
  delivery: string;
  status: string;
  dropshipping: boolean;
  scheduledDate: string;
  value: number;
}

export interface CreditScheduledItem {
  id: number;
  delivery: string;
  status: string;
  completed: boolean;
  scheduledDate: string;
  value: number;
}

export interface CreditIncomingItem {
  id: number;
  delivery: string;
  scheduledDate: string;
  value: number;
}

export interface RevenuePerYear {
  year: number;
  revenue: number;
}

export interface LogEntry {
  id: number;
  user: string;
  date: string;
  property: string;
  oldValue: string;
  newValue: string;
}

export interface CustomerQuotation {
  id: number;
  quotationNumber: string;
  date: string;
  by: string;
  price: number;
  status: string;
  notes: number;
}

export interface CustomerData {
  id: number;
  companyName: string;
  vatCountry: string;
  vatNumber: string;
  chamberOfCommerceNumber: string;
  companyType: string | null;
  salutation: string | null;
  siteview: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneCountry: string;
  phone: string;
  birthDate: Date | null;
  paymentMethod: string | null;
  preferredShowroom: string | null;
  showPrices: string;
  newsletter: boolean;
  appointmentUrlsActive: boolean;
  appointmentUrls: { swnl: string; swbeNl: string; swbeFr: string };
  financialEmail: string;
  reviewsActive: boolean;
  reviewInactiveReason: string | null;
  canPayOnAccount: boolean;
  debtorNumber: string;
  creditLimit: number;
  invoiceDueDays: number;
  allowTemporaryCredit: boolean;
  temporaryCreditLimit: number;
  temporaryCreditExpiryDate: Date | null;
  notes: string;
  baseDiscount: number;
  brandDiscounts: BrandDiscount[];
  productDiscounts: ProductDiscount[];
  accountStatus: string;
  accountLastLogin: string;
  addresses: CustomerAddress[];
  cart: CustomerCartItem[];
  wishlists: Wishlist[];
  deliveredUnpaid: DeliveredItem[];
  reservedCreditItems: ReservedItem[];
  creditScheduled: CreditScheduledItem[];
  creditIncoming: CreditIncomingItem[];
}
