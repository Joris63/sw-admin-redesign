export type QuotationStatus = 'Open' | 'Omgezet' | 'Verlopen' | 'Geannuleerd';

export interface QuotationLine {
  id: number;
  productcode: string;
  naam: string;
  levertijd: string;
  voorraad: 'op-voorraad' | 'beperkt' | 'niet-op-voorraad';
  aantal: number;
  prijsOud?: number;
  prijs: number;
  afbeelding?: string;
}

export interface QuotationGroup {
  id: string;
  naam: string;
  lines: QuotationLine[];
}

export interface QuotationTask {
  id: number;
  omschrijving: string;
  deadline: string;
  status: 'Niet begonnen' | 'In behandeling' | 'Afgerond';
  afdeling: string;
  gebruiker: string;
  eigenaar: string;
}

export interface QuotationLogEntry {
  id: number;
  datum: string;
  productId?: string;
  productcode?: string;
  omschrijving: string;
  aantal?: number;
  prijs?: number;
  actie: string;
  gebruiker: string;
}

export interface QuotationEmail {
  id: number;
  datum: string;
  onderwerp: string;
  naar: string;
  type: string;
}

export interface QuotationOpmerking {
  id: number;
  datum: string;
  gebruiker: string;
  tekst: string;
  voor?: string;
}

export interface QuotationDocument {
  id: number;
  naam: string;
  datum: string;
  type: string;
}

export interface QuotationData {
  offertenummer: string;
  status: QuotationStatus;
  site: string;

  // Klant (billing address)
  voornaam: string;
  achternaam: string;
  land: string;
  straat: string;
  huisnummer: string;
  toevoeging?: string;
  postcode: string;
  woonplaats: string;
  telefoonLand: string;
  telefoon: string;
  alternatief?: string;

  // Klantgegevens
  klantEmail: string;
  klantHeeftAccount: boolean;
  klantType: string;

  // Offerte gegevens
  besteldatum: string;
  geholpenDoor: string;
  kanaal: string;
  vestiging: string;
  wanneerVerbouwenJaar?: string;
  wanneerVerbouwenMaand?: string;
  referentie?: string;

  // Externe contacten
  aanbevolen?: {
    bedrijf?: string;
    woonplaats?: string;
    typeBedrijf?: string;
  };
  aannemer?: {
    bedrijf?: string;
    woonplaats?: string;
    typeBedrijf?: string;
  };

  // Aanbod
  groups: QuotationGroup[];

  // Communicatie
  emails: QuotationEmail[];
  opmerkingen: QuotationOpmerking[];
  documenten: QuotationDocument[];

  // Taken
  taken: QuotationTask[];

  // Logs
  productLog: QuotationLogEntry[];
  algemeenLog: QuotationLogEntry[];
}
