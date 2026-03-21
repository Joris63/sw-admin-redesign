import type { NavigationSection } from '@/types/navigation';

export const administrationSection: NavigationSection = {
  label: 'ADMINISTRATIE',
  navItems: [
    {
      label: 'Taken',
      children: [
        {
          label: 'Takenoverzicht',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Afdelingsoverzicht',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Adfeling beheren',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Nieuwe taak',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Notificaties',
          route: '/',
          isOldAdmin: true,
        },
      ],
      icon: 'pi-list-check',
    },
    {
      label: 'Verkoop',
      children: [
        {
          label: 'Bestellingen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Bestelling toevoegen',
          route: '/sales/orders/add',
        },
        {
          label: 'Directe verkoop',
          route: '/sales/direct',
        },
        {
          label: 'Bedrijfsbestellingen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Offertes',
          route: '/sales/quotations'
        },
        {
          label: 'Klanten',
          route: '/sales/customers',
        },
        {
          label: 'Omzet',
          route: '/',
        },
        {
          label: 'Dagafsluiting',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Verlanglijsten',
          route: '/',
        },
      ],
      icon: 'pi-chart-line',
    },
    {
      label: 'Inkoop',
      children: [
        {
          label: 'Interne bestellingen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Interne bestelling toevoegen',
          route: '/',
        },
        {
          label: 'Inkooporders',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Inkooporders bulk import',
          route: '/',
        },
        {
          label: 'Inkoopfacturen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Leveranciers',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Leveranicer bonussen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: "Leveranciers leverschema's",
          route: '/',
        },
        {
          label: 'Achterstallige orders',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Autobestel instellingen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Inkoopalternatieven vergelijken',
          route: '/',
        },
        {
          label: 'Inkoopalternatieven exporteren',
          route: '/',
        },
        {
          label: 'Inkooporders dashboard',
          route: '/',
        },
        {
          label: 'Inkoopalternatief switch instellingen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Showroomkortingen',
          route: '/',
        },
      ],
      icon: 'pi-shopping-cart',
    },
    {
      label: 'Boekhouding',
      children: [
        {
          label: 'Factuur en order CSV',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Productprijzen CSV',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Groet prijsveranderingen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Inkoopprijzen corrigeren',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Product import merken marges',
          route: '/',
        },
      ],
      icon: 'pi-book',
    },
    {
      label: 'Logistiek',
      children: [
        {
          label: 'Verzendingen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Verzendsticker printen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Uitzonderingen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Planning',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Lege picklocaties',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Werkvoorraad dashboard',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Dashboard opmerkingen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Pakbon verifier',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Werkstation',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Palletgoederen label scan',
          route: '/',
        },
        {
          label: 'Uitgaand dashboard',
          route: '/',
        },
        {
          label: 'Locaties',
          route: '/logistics/locations',
        },
      ],
      icon: 'pi-truck',
    },
  ],
};
