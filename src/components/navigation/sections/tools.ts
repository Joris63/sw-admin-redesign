import type { NavigationSection } from '@/types/navigation';

export const toolsSection: NavigationSection = {
  label: 'TOOLS',
  navItems: [
    {
      label: 'Producten',
      children: [
        {
          label: 'Variant validator',
          route: '/',
        },
      ],
      icon: 'pi-cog',
    },
    {
      label: 'Levertijd berekening',
      children: [
        {
          label: 'Lervertijd berekening tool',
          route: '/',
        },
      ],
      icon: 'pi-calendar',
    },
  ],
};
