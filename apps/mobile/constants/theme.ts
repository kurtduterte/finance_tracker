import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1A1A2E',
    background: '#F0EEFE',
    tint: '#7B61FF',
    icon: '#9E9E9E',
    tabIconDefault: '#9E9E9E',
    tabIconSelected: '#7B61FF',
  },
  dark: {
    text: '#ECEDEE',
    background: '#0F0E17',
    tint: '#9B7EFF',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#9B7EFF',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const MD3Colors = {
  primary: '#7B61FF',
  primaryLight: '#9B7EFF',
  primaryContainer: '#EDE9FE',
  onPrimary: '#FFFFFF',
  secondary: '#4CAF50',
  error: '#D32F2F',
  warning: '#FF9800',
  surface: '#FFFFFF',
  surfaceVariant: '#F5F2FF',
  outline: '#E8E4F0',
  background: '#F0EEFE',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B6B8A',
  // Bank colors
  gcash: '#007AFF',
  maya: '#00B14F',
  maribank: '#6750A4',
  cash: '#78909C',
  // Dark FAB
  fabDark: '#1A1A2E',
} as const

export const CategoryColors: Record<string, { bg: string; icon: string }> = {
  general:        { bg: '#EDE9FE', icon: '#7B61FF' },
  food:           { bg: '#E8F5E9', icon: '#43A047' },
  transportation: { bg: '#E3F2FD', icon: '#1E88E5' },
  bills:          { bg: '#FFF3E0', icon: '#FB8C00' },
  subscriptions:  { bg: '#F3E5F5', icon: '#AB47BC' },
  shopping:       { bg: '#FCE4EC', icon: '#E91E63' },
  entertainment:  { bg: '#E8EAF6', icon: '#3949AB' },
}

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const

export const Shadow = {
  card: {
    shadowColor: '#7B61FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  fab: {
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
} as const
