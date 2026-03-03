export type FilterType = 'text' | 'boolean';

export interface FilterConfig {
  key: string;
  label: string;
  type: FilterType;
  placeholder?: string;
}
