// ─── Locations mock data ───────────────────────────────────────────────────────

export interface Store {
  id: number;
  name: string;
  country: string;
  active: boolean;
}

export interface Warehouse {
  id: number;
  name: string;
  city: string;
  country: string;
  containsGoods: boolean;
}

export interface WarehouseGroup {
  id: number;
  abbreviation: string;
  name: string;
}

export interface PickupLocation {
  id: number;
  country: string;
  name: string;
  address: string;
  phoneNumber: string;
}

export interface CustomerService {
  id: number;
  name: string;
  site: string;
}

export const MOCK_STORES: Store[] = [
  { id: 1, name: 'Alkmaar', country: 'NL', active: true },
  { id: 2, name: 'Almere', country: 'NL', active: true },
  { id: 3, name: 'Amsterdam Amstel', country: 'NL', active: true },
  { id: 4, name: 'Amsterdam West', country: 'NL', active: true },
  { id: 5, name: 'Arnhem', country: 'NL', active: true },
  { id: 6, name: 'Breda', country: 'NL', active: true },
  { id: 7, name: 'Eindhoven', country: 'NL', active: true },
  { id: 8, name: 'Groningen', country: 'NL', active: true },
  { id: 9, name: 'Haarlem', country: 'NL', active: false },
  { id: 10, name: 'Den Haag', country: 'NL', active: true },
  { id: 11, name: 'Leeuwarden', country: 'NL', active: true },
  { id: 12, name: 'Leiden', country: 'NL', active: true },
  { id: 13, name: 'Maastricht', country: 'NL', active: false },
  { id: 14, name: 'Nijmegen', country: 'NL', active: true },
  { id: 15, name: 'Rotterdam', country: 'NL', active: true },
  { id: 16, name: 'Tilburg', country: 'NL', active: true },
  { id: 17, name: 'Utrecht', country: 'NL', active: true },
  { id: 18, name: 'Zwolle', country: 'NL', active: true },
  { id: 19, name: 'Antwerpen', country: 'BE', active: true },
  { id: 20, name: 'Gent', country: 'BE', active: true },
  { id: 21, name: 'Brussel', country: 'BE', active: false },
];

export const MOCK_WAREHOUSES: Warehouse[] = [
  { id: 1, name: 'Centraal magazijn Den Bosch', city: 'Den Bosch', country: 'NL', containsGoods: true },
  { id: 2, name: 'Inkomend Alkmaar', city: 'Alkmaar', country: 'NL', containsGoods: false },
  { id: 3, name: 'Inkomend Amsterdam Amstel', city: 'Amsterdam', country: 'NL', containsGoods: false },
  { id: 4, name: 'Inkomend Amsterdam West', city: 'Amsterdam', country: 'NL', containsGoods: true },
  { id: 5, name: 'Inkomend Arnhem', city: 'Arnhem', country: 'NL', containsGoods: false },
  { id: 6, name: 'Inkomend Breda', city: 'Breda', country: 'NL', containsGoods: false },
  { id: 7, name: 'Inkomend Eindhoven', city: 'Son en Breugel', country: 'NL', containsGoods: true },
  { id: 8, name: 'Inkomend Groningen', city: 'Groningen', country: 'NL', containsGoods: false },
  { id: 9, name: 'Inkomend Hasselt', city: 'Hasselt', country: 'BE', containsGoods: false },
  { id: 10, name: 'Inkomend Utrecht', city: 'Utrecht', country: 'NL', containsGoods: true },
  { id: 11, name: 'Retour Rotterdam', city: 'Rotterdam', country: 'NL', containsGoods: true },
  { id: 12, name: 'Showroom Voorraad NL', city: 'Rosmalen', country: 'NL', containsGoods: true },
  { id: 13, name: 'Showroom Voorraad BE', city: 'Kalmthout', country: 'BE', containsGoods: true },
  { id: 14, name: 'Quarantaine Den Bosch', city: 'Den Bosch', country: 'NL', containsGoods: true },
  { id: 15, name: 'Outbound Rosmalen', city: 'Rosmalen', country: 'NL', containsGoods: false },
];

export const MOCK_WAREHOUSE_GROUPS: WarehouseGroup[] = [
  { id: 1, abbreviation: 'ROS', name: 'Voorraad Rosmalen' },
  { id: 2, abbreviation: 'KAL', name: 'Voorraad Kalmthout' },
  { id: 3, abbreviation: 'AMS', name: 'Voorraad Amsterdam West' },
  { id: 4, abbreviation: 'SHOW', name: 'Showrooms' },
  { id: 5, abbreviation: 'SHOWM', name: 'Showroom Modellen' },
  { id: 6, abbreviation: 'RTM', name: 'Voorraad Rotterdam' },
  { id: 7, abbreviation: 'GRN', name: 'Voorraad Groningen' },
  { id: 8, abbreviation: 'IN', name: 'Inkomend' },
  { id: 9, abbreviation: 'RET', name: 'Retouren' },
  { id: 10, abbreviation: 'QUA', name: 'Quarantaine' },
];

export const MOCK_PICKUP_LOCATIONS: PickupLocation[] = [
  { id: 1, country: 'NL', name: 'Alkmaar', address: 'Koelmalaan 330, 1812 PS Alkmaar', phoneNumber: '+31722014000' },
  { id: 2, country: 'NL', name: 'Almere', address: 'Miamistraat 100, 1334 KX Almere', phoneNumber: '+31362076083' },
  { id: 3, country: 'NL', name: 'Amsterdam Amstel', address: 'Daniël Goedkoopstraat 23, 1096BD Amsterdam', phoneNumber: '+31735220688' },
  { id: 4, country: 'NL', name: 'Amsterdam West', address: 'Willem de Zwijgerlaan 344, 1055RD Amsterdam', phoneNumber: '+31207603030' },
  { id: 5, country: 'NL', name: 'Arnhem', address: 'Heerlenstraat 65, 6845 AE Arnhem', phoneNumber: '+31263033880' },
  { id: 6, country: 'NL', name: 'Breda', address: 'Grenssteen 19, 4815PP Breda', phoneNumber: '+31762300000' },
  { id: 7, country: 'NL', name: 'Eindhoven', address: 'Luchthavenweg 81, 5657 EA Eindhoven', phoneNumber: '+31402512340' },
  { id: 8, country: 'NL', name: 'Groningen', address: 'Driebondsweg 123, 9723 BR Groningen', phoneNumber: '+31503690000' },
  { id: 9, country: 'NL', name: 'Den Haag', address: 'Binckhorstlaan 36, 2516 BE Den Haag', phoneNumber: '+31703816010' },
  { id: 10, country: 'NL', name: 'Rotterdam', address: 'Weena 70, 3012 CM Rotterdam', phoneNumber: '+31102121700' },
  { id: 11, country: 'NL', name: 'Utrecht', address: 'Europalaan 100, 3526 KS Utrecht', phoneNumber: '+31302825600' },
  { id: 12, country: 'NL', name: 'Zwolle', address: 'Celsiusstraat 1, 8013 RD Zwolle', phoneNumber: '+31384261980' },
  { id: 13, country: 'BE', name: 'Antwerpen', address: 'Bisschoppenhoflaan 500, 2100 Deurne', phoneNumber: '+3232392150' },
  { id: 14, country: 'BE', name: 'Gent', address: 'Kortrijksesteenweg 1106, 9051 Sint-Denijs-Westrem', phoneNumber: '+3292417080' },
  { id: 15, country: 'BE', name: 'Hasselt', address: 'Kempische Steenweg 301, 3500 Hasselt', phoneNumber: '+3211285090' },
];

export const MOCK_CUSTOMER_SERVICE: CustomerService[] = [
  { id: 1, name: 'Klantenservice Nederland', site: 'SWNL' },
  { id: 2, name: 'Klantenservice België', site: 'SWBE' },
  { id: 3, name: 'Klantenservice Frankrijk', site: 'SWFR' },
];
