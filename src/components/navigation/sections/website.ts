import type { NavigationSection } from '@/types/navigation';

export const websiteSection: NavigationSection = {
  label: 'WEBSITE',
  navItems: [
    {
      label: 'Content',
      children: [
        {
          label: "Pagina's",
          route: '/',
        },
        {
          label: 'Auteurs',
          route: '/',
        },
        {
          label: 'Banners',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Content blokken',
          route: '/',
        },
        {
          label: 'Uitgelichte producten',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Menu manager',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Promotiecodes',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Promotiecodes bulk',
          route: '/',
        },
        {
          label: 'Cadeaubonnen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Filters',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'URL Management (redirects)',
          route: '/',
        },
        {
          label: 'Productbeoordelingen',
          route: '/',
        },
      ],
      icon: 'pi-pencil',
    },
    {
      label: 'Product management',
      children: [
        {
          label: 'Producten',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Producten grid',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Product imports',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Import bestand genereren',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Top 5000 uit feed',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Categorieen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Merken',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Attributen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Attribute groepen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Productprofielen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Acties',
          route: '/marketing/offers',
        },
        {
          label: 'Gewijzigde productattributen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Afbeeldingen ontdubbelen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Product zoek gewichten',
          route: '/',
          isOldAdmin: true,
        },
      ],
      icon: 'pi-warehouse',
    },
    {
      label: 'Cache management',
      children: [
        {
          label: 'Cache invalidatie',
          route: '/',
        },
      ],
      icon: 'pi-sync',
    },
    {
      label: 'Optimalisatie',
      children: [
        {
          label: 'Begrippen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Productnamen vertalen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Attributen vertalen',
          route: '/',
          isOldAdmin: true,
        },
      ],
      icon: 'pi-sliders-h',
    },
  ],
};
