export type NavItem = NavItemWithRoute | NavItemWithoutRoute;

interface NavItemWithRoute {
  label: string;
  route: string;
  icon?: string;
  isOldAdmin?: boolean;
}

interface NavItemWithoutRoute {
  label: string;
  children: NavItem[];
  icon?: string;
}

export interface NavigationSection {
  label?: string;
  navItems: NavItem[];
}
