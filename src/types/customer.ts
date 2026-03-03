export interface CustomerAddress {
  id: number;
  naam: string;
  straat: string;
  huisnummer: string;
  postcode: string;
  woonplaats: string;
  land: string;
  telefoon: string;
  isStandaardBezorg: boolean;
  isStandaardFactuur: boolean;
}

export interface CustomerCartItem {
  id: number;
  naam: string;
  productcode: string;
  aantal: number;
  prijs: number;
}

export interface WishlistItem {
  id: number;
  naam: string;
  productcode: string;
  aantal: number;
  prijs: number;
}

export interface Wishlist {
  id: number;
  naam: string;
  items: WishlistItem[];
}

export interface MerkKorting {
  id: number;
  merk: string;
  korting: number;
  standaardKorting: number;
}

export interface ProductKorting {
  id: number;
  productcode: string;
  product: string;
  prijs: number;
  kortingPrijs: number;
}

export interface GeleverdItem {
  id: number;
  levering: string;
  factuurnummer: string;
  factuurdatum: string;
  vervaldatum: string;
  waarde: number;
  vervaldatumOverschreden: boolean;
}

export interface GereserveerdItem {
  id: number;
  levering: string;
  status: string;
  dropshipping: boolean;
  ingeplandeDatum: string;
  waarde: number;
}

export interface KredietIngeplandItem {
  id: number;
  levering: string;
  status: string;
  voltooid: boolean;
  ingeplandeDatum: string;
  waarde: number;
}

export interface KredietAankomendeItem {
  id: number;
  levering: string;
  ingeplandeDatum: string;
  waarde: number;
}

export interface OmzetPerJaar {
  jaar: number;
  omzet: number;
}

export interface LogboekEntry {
  id: number;
  gebruiker: string;
  datum: string;
  eigenschap: string;
  oudeWaarde: string;
  nieuweWaarde: string;
}

export interface CustomerOfferte {
  id: number;
  offertenummer: string;
  datum: string;
  door: string;
  prijs: number;
  status: string;
  opmerkingen: number;
}

export interface CustomerData {
  id: number;
  bedrijfsnaam: string;
  btwLand: string;
  btwNummer: string;
  kvkNummer: string;
  typeBedrijf: string | null;
  aanhef: string | null;
  siteview: string;
  voornaam: string;
  achternaam: string;
  email: string;
  telefoonLand: string;
  telefoon: string;
  geboortedatum: Date | null;
  betaalmethode: string | null;
  voorkeurShowroom: string | null;
  toonPrijzen: string;
  nieuwsbrief: boolean;
  afspraakURLsActief: boolean;
  afspraakURLs: { swnl: string; swbeNl: string; swbeFr: string };
  financieelEmail: string;
  reviewsActief: boolean;
  reviewInactiefReden: string | null;
  kanBetalenOpRekening: boolean;
  debiteurNummer: string;
  kredietlimiet: number;
  vervaldagenFactuur: number;
  tijdelijkKredietToestaan: boolean;
  tijdelijkKredietLimiet: number;
  tijdelijkKredietVervalDatum: Date | null;
  opmerkingen: string;
  basisKorting: number;
  merkKortingen: MerkKorting[];
  productKortingen: ProductKorting[];
  accountStatus: string;
  accountLaatsteLogin: string;
  addresses: CustomerAddress[];
  cart: CustomerCartItem[];
  wishlists: Wishlist[];
  geleverdNietBetaald: GeleverdItem[];
  gereserveerdKredietItems: GereserveerdItem[];
  kredietIngepland: KredietIngeplandItem[];
  kredietAankomend: KredietAankomendeItem[];
}
