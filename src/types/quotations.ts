export type QuotationStatus = 'Open' | 'Converted' | 'Expired' | 'Cancelled';

export interface QuotationLine {
  id: number;
  productCode: string;
  name: string;
  deliveryTime: string;
  stock: 'in-stock' | 'limited' | 'out-of-stock';
  quantity: number;
  oldPrice?: number;
  price: number;
  image?: string;
}

export interface QuotationGroup {
  id: string;
  name: string;
  lines: QuotationLine[];
}

export interface QuotationTask {
  id: number;
  description: string;
  deadline: string;
  status: 'Not started' | 'In progress' | 'Completed';
  department: string;
  user: string;
  owner: string;
}

export interface QuotationLogEntry {
  id: number;
  date: string;
  productId?: string;
  productCode?: string;
  description: string;
  quantity?: number;
  price?: number;
  action: string;
  user: string;
}

export interface QuotationEmail {
  id: number;
  date: string;
  subject: string;
  to: string;
  type: string;
}

export interface QuotationNote {
  id: number;
  date: string;
  user: string;
  text: string;
  for?: string;
}

export interface QuotationDocument {
  id: number;
  name: string;
  date: string;
  type: string;
}

export interface QuotationData {
  quotationNumber: string;
  status: QuotationStatus;
  site: string;

  // Customer (billing address)
  firstName: string;
  lastName: string;
  country: string;
  street: string;
  houseNumber: string;
  addition?: string;
  postalCode: string;
  city: string;
  phoneCountry: string;
  phone: string;
  alternative?: string;

  // Customer details
  customerEmail: string;
  customerHasAccount: boolean;
  customerType: string;

  // Quotation details
  orderDate: string;
  assistedBy: string;
  channel: string;
  branch: string;
  renovationYear?: string;
  renovationMonth?: string;
  reference?: string;

  // External contacts
  recommended?: {
    company?: string;
    city?: string;
    companyType?: string;
  };
  contractor?: {
    company?: string;
    city?: string;
    companyType?: string;
  };

  // Offer
  groups: QuotationGroup[];

  // Communication
  emails: QuotationEmail[];
  notes: QuotationNote[];
  documents: QuotationDocument[];

  // Tasks
  tasks: QuotationTask[];

  // Logs
  productLog: QuotationLogEntry[];
  generalLog: QuotationLogEntry[];
}
