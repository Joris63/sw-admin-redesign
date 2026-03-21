import type { NavigationSection } from '@/types/navigation';
import { homeSection } from './sections/home';
import { administrationSection } from './sections/administration';
import { websiteSection } from './sections/website';
import { itSection } from './sections/it';
import { toolsSection } from './sections/tools';

export const navigationSections: NavigationSection[] = [
  homeSection,
  administrationSection,
  websiteSection,
  itSection,
  toolsSection,
];
