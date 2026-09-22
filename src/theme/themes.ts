/**
 * Three design directions for the business showcase. Each is a complete token
 * set (colour, type, radius, surface style) so the whole app restyles when the
 * theme changes. Brand values come from bobsbulkbooze.com.au.
 */

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

export type ThemeId = 'classic' | 'glass' | 'retail';

export type ThemeFonts = { display: string; regular: string; medium: string; semibold: string; bold: string };
export type ThemeRadius = { sm: number; md: number; lg: number; pill: number };

export type Theme = {
  id: ThemeId;
  scheme: 'light' | 'dark';
  /** `glass` surfaces are translucent with a blur and a hairline border. */
  style: 'solid' | 'glass';
  bg: string;
  /** Colour of the page behind the phone-width frame on wide web screens. */
  backdrop: string;
  surface: string;
  surfaceAlt: string;
  surfaceBorder: string;
  text: string;
  textMuted: string;
  line: string;
  primary: string;
  primaryText: string;
  /** Card background for the `primary` tone (translucent on glass). */
  primarySurface: string;
  accent: string;
  accentText: string;
  accentSoft: string;
  /** Card background for the `accent` tone. */
  accentSurface: string;
  success: string;
  danger: string;
  tabBar: string;
  tabBarBorder: string;
  fonts: ThemeFonts;
  radius: ThemeRadius;
  displayTransform: 'none' | 'uppercase';
  displayTracking: number;
  memberCard: { bg: string; stripe: string; text: string; subtle: string; accent: string; qr: string };
  ageGate: { bg: string; logo: string; logoSub: string; title: string; body: string };
  /** Soft gradient blobs drawn behind everything (glass only). */
  glow?: string[];
};

export const themeMeta: { id: ThemeId; name: string; tagline: string; swatches: string[] }[] = [
  {
    id: 'classic',
    name: 'Bob’s Classic',
    tagline: 'The brand as it is today. Burgundy, orange and chunky slab type.',
    swatches: [brand.burgundy, brand.orange, brand.cream],
  },
  {
    id: 'glass',
    name: 'Glass',
    tagline: 'Frosted layers, a floating dock and soft gradient glow. Modern and premium.',
    swatches: ['#12101C', '#FF5C7A', '#FFB547'],
  },
  {
    id: 'retail',
    name: 'Big Box',
    tagline: 'Loud, price-led retail in the style of the majors. Green, yellow, condensed type.',
    swatches: ['#0E4D3A', '#FFD100', '#F4F5F2'],
  },
];

const classicFonts: ThemeFonts = {
  display: 'AlfaSlabOne_400Regular',
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
};

const glassFonts: ThemeFonts = {
  display: 'Outfit_700Bold',
  regular: 'Outfit_400Regular',
  medium: 'Outfit_500Medium',
  semibold: 'Outfit_600SemiBold',
  bold: 'Outfit_700Bold',
};

const retailFonts: ThemeFonts = {
  display: 'Oswald_700Bold',
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
};

const classicRadius: ThemeRadius = { sm: 10, md: 16, lg: 24, pill: 999 };
const glassRadius: ThemeRadius = { sm: 14, md: 22, lg: 30, pill: 999 };
const retailRadius: ThemeRadius = { sm: 4, md: 6, lg: 8, pill: 4 };

const classicLight: Theme = {
  id: 'classic',
  scheme: 'light',
  style: 'solid',
  bg: brand.cream,
  backdrop: brand.burgundyDeep,
  surface: brand.white,
  surfaceAlt: brand.orangeSoft,
  surfaceBorder: 'transparent',
  text: brand.ink,
  textMuted: brand.inkMuted,
  line: brand.line,
  primary: brand.burgundy,
  primaryText: brand.white,
  primarySurface: brand.burgundy,
  accent: brand.orange,
  accentText: brand.burgundyDeep,
  accentSoft: brand.orangeSoft,
  accentSurface: brand.orange,
  success: brand.success,
  danger: brand.danger,
  tabBar: brand.white,
  tabBarBorder: brand.line,
  fonts: classicFonts,
  radius: classicRadius,
  displayTransform: 'none',
  displayTracking: -0.5,
  memberCard: { bg: brand.burgundy, stripe: brand.burgundyDark, text: brand.white, subtle: 'rgba(255,255,255,0.85)', accent: brand.orange, qr: brand.burgundyDeep },
  ageGate: { bg: brand.orange, logo: brand.burgundy, logoSub: brand.white, title: brand.burgundyDeep, body: brand.inkMuted },
};

const classicDark: Theme = {
  ...classicLight,
  scheme: 'dark',
  bg: '#1A1214',
  backdrop: '#0E0809',
  surface: '#241A1D',
  surfaceAlt: '#2F2225',
  text: '#F7EFE6',
  textMuted: '#B9ABA5',
  line: '#3A2C30',
  primary: '#C2314B',
  primarySurface: '#C2314B',
  accentText: '#1A1214',
  accentSoft: '#3A2A1C',
  success: '#3DBA7C',
  danger: '#EF5350',
  tabBar: '#241A1D',
  tabBarBorder: '#3A2C30',
};

const glass: Theme = {
  id: 'glass',
  scheme: 'dark',
  style: 'glass',
  bg: '#0C0A14',
  backdrop: '#07060C',
  surface: 'rgba(255,255,255,0.07)',
  surfaceAlt: 'rgba(255,181,71,0.10)',
  surfaceBorder: 'rgba(255,255,255,0.14)',
  text: '#F7F5FF',
  textMuted: 'rgba(247,245,255,0.62)',
  line: 'rgba(255,255,255,0.10)',
  primary: '#FF5C7A',
  primaryText: '#1A0A10',
  primarySurface: 'rgba(255,92,122,0.28)',
  accent: '#FFB547',
  accentText: '#1F1206',
  accentSoft: 'rgba(255,181,71,0.16)',
  accentSurface: 'rgba(255,181,71,0.22)',
  success: '#4ADE9C',
  danger: '#FF6B6B',
  tabBar: 'rgba(22,19,34,0.62)',
  tabBarBorder: 'rgba(255,255,255,0.16)',
  fonts: glassFonts,
  radius: glassRadius,
  displayTransform: 'none',
  displayTracking: -1,
  memberCard: { bg: 'rgba(255,92,122,0.22)', stripe: 'rgba(255,255,255,0.06)', text: '#FFFFFF', subtle: 'rgba(255,255,255,0.72)', accent: '#FFB547', qr: '#1A0A10' },
  ageGate: { bg: '#0C0A14', logo: '#FFFFFF', logoSub: '#FFB547', title: '#F7F5FF', body: 'rgba(247,245,255,0.7)' },
  glow: ['#A01C33', '#F69D25', '#5B3FD9'],
};

const retailLight: Theme = {
  id: 'retail',
  scheme: 'light',
  style: 'solid',
  bg: '#F4F5F2',
  backdrop: '#062A20',
  surface: '#FFFFFF',
  surfaceAlt: '#FFF7CC',
  surfaceBorder: 'transparent',
  text: '#121412',
  textMuted: '#5B6660',
  line: '#DDE2DE',
  primary: '#0E4D3A',
  primaryText: '#FFFFFF',
  primarySurface: '#0E4D3A',
  accent: '#FFD100',
  accentText: '#121412',
  accentSoft: '#FFF7CC',
  accentSurface: '#FFD100',
  success: '#1F7A4D',
  danger: '#D7191C',
  tabBar: '#0E4D3A',
  tabBarBorder: '#0A3B2C',
  fonts: retailFonts,
  radius: retailRadius,
  displayTransform: 'uppercase',
  displayTracking: 0.5,
  memberCard: { bg: '#0E4D3A', stripe: '#0A3B2C', text: '#FFFFFF', subtle: 'rgba(255,255,255,0.8)', accent: '#FFD100', qr: '#0E4D3A' },
  ageGate: { bg: '#0E4D3A', logo: '#FFD100', logoSub: '#FFFFFF', title: '#0E4D3A', body: '#5B6660' },
};

const retailDark: Theme = {
  ...retailLight,
  scheme: 'dark',
  bg: '#0F1512',
  backdrop: '#05100C',
  surface: '#182019',
  surfaceAlt: '#2A2A12',
  text: '#F1F4F0',
  textMuted: '#A3ADA6',
  line: '#26302A',
  primary: '#2FA37A',
  primarySurface: '#145C45',
  accentSoft: '#2A2A12',
  success: '#3DBA7C',
  danger: '#FF5A5A',
  tabBar: '#0A3B2C',
  tabBarBorder: '#062A20',
  ageGate: { bg: '#0A3B2C', logo: '#FFD100', logoSub: '#FFFFFF', title: '#F1F4F0', body: '#A3ADA6' },
};

export const themes: Record<ThemeId, { light: Theme; dark: Theme }> = {
  classic: { light: classicLight, dark: classicDark },
  glass: { light: glass, dark: glass },
  retail: { light: retailLight, dark: retailDark },
};

export const DEFAULT_THEME: ThemeId = 'classic';
