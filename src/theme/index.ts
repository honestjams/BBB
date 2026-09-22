/**
 * Bob's Bulk Booze design tokens.
 * Derived from bobsbulkbooze.com.au: burgundy #A01C33, orange #F69D25,
 * chunky slab display type (Alfa Slab One) and Poppins for everything else.
 */
import { useColorScheme } from 'react-native';

export const brand = {
  burgundy: '#A01C33',
  burgundyDark: '#7E1428',
  burgundyDeep: '#5C0E1D',
  orange: '#F69D25',
  orangeDark: '#D9821A',
  orangeSoft: '#FFF1DB',
  cream: '#FFF8EE',
  white: '#FFFFFF',
  ink: '#2B2B2B',
  inkMuted: '#6E6560',
  line: '#EFE1CF',
  success: '#1E8E5A',
  danger: '#C62828',
} as const;

export type Theme = {
  scheme: 'light' | 'dark';
  bg: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  line: string;
  primary: string;
  primaryText: string;
  accent: string;
  accentText: string;
  accentSoft: string;
  success: string;
  danger: string;
  tabBar: string;
};

const light: Theme = {
  scheme: 'light',
  bg: brand.cream,
  surface: brand.white,
  surfaceAlt: brand.orangeSoft,
  text: brand.ink,
  textMuted: brand.inkMuted,
  line: brand.line,
  primary: brand.burgundy,
  primaryText: brand.white,
  accent: brand.orange,
  accentText: brand.burgundyDeep,
  accentSoft: brand.orangeSoft,
  success: brand.success,
  danger: brand.danger,
  tabBar: brand.white,
};

const dark: Theme = {
  scheme: 'dark',
  bg: '#1A1214',
  surface: '#241A1D',
  surfaceAlt: '#2F2225',
  text: '#F7EFE6',
  textMuted: '#B9ABA5',
  line: '#3A2C30',
  primary: '#C2314B',
  primaryText: brand.white,
  accent: brand.orange,
  accentText: '#1A1214',
  accentSoft: '#3A2A1C',
  success: '#3DBA7C',
  danger: '#EF5350',
  tabBar: '#241A1D',
};

export function useTheme(): Theme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? dark : light;
}

export const fonts = {
  display: 'AlfaSlabOne_400Regular',
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

/** Minimum comfortable tap target. */
export const tap = 48;

/** RN 0.76+ / react-native-web support CSS box shadows; the old shadow* props are deprecated. */
export const shadow = {
  card: {
    boxShadow: '0 6px 16px rgba(92, 14, 29, 0.08)',
  },
} as const;
