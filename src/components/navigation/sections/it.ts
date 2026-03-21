import type { NavigationSection } from '@/types/navigation';

export const itSection: NavigationSection = {
  label: 'IT',
  navItems: [
    {
      label: 'Management',
      children: [
        {
          label: 'Voorkeuren',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Werknemers',
          route: '/',
          isOldAdmin: true,
        },
        {
          label: 'Profielen',
          route: '/',
        },
        {
          label: 'Overzichten',
          route: '/',
          isOldAdmin: true,
        },
      ],
      icon: 'pi-wrench',
    },
  ],
};
