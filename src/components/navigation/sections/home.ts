import type { NavigationSection } from '@/types/navigation';

export const homeSection: NavigationSection = {
  navItems: [
    {
      label: 'Home',
      route: '/',
      icon: 'pi-home',
    },
    {
      label: 'Showroom',
      children: [
        {
          label: 'Directe verkoop',
          route: '/sales/direct',
        },
        {
          label: 'Product invoeren',
          route: '/sales/orders/add',
        },
        {
          label: 'Offertes',
          route: '/sales/quotations'
        },
        {
          label: 'Bestellingen',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Verlanglijsten',
          route: '/',
        },
      ],
      icon: 'pi-shop',
    },
  ],
};
