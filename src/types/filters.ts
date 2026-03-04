export type FilterType = 'text' | 'boolean' | 'select';

export interface FilterConfig {
  key: string;
  label: string;
  type: FilterType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
}
