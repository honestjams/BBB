/**
 * Bob's Bulk Booze design tokens. Theme-dependent values (colour, type,
 * radius, surface style) come from `useTheme()`; only spacing and the tap
 * target are the same in every direction.
 */
import { createContext, useContext } from 'react';
import { Platform, type ViewStyle } from 'react-native';

import { DEFAULT_THEME, themes, type Theme } from './themes';

export { brand, themeMeta, themes, DEFAULT_THEME } from './themes';
export type { Theme, ThemeId, ThemeFonts, ThemeRadius } from './themes';

export const ThemeContext = createContext<Theme>(themes[DEFAULT_THEME].light);

export function useTheme(): Theme {
  return useContext(ThemeContext);
}

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

/** Minimum comfortable tap target. */
export const tap = 48;

export const shadow = {
  card: {
    boxShadow: '0 6px 16px rgba(92, 14, 29, 0.08)',
  },
} as const;

/**
 * Styles that only exist on the web (backdrop-filter and friends). React
 * Native's types do not know them, so they are cast here in one place.
 */
export function webOnly(style: Record<string, unknown>): ViewStyle | undefined {
  return Platform.OS === 'web' ? (style as ViewStyle) : undefined;
}

/** Translucent frosted surface for glass themes; solid themes get nothing. */
export function glassSurface(t: Theme): ViewStyle | undefined {
  if (t.style !== 'glass') return undefined;
  return { borderWidth: 1, borderColor: t.surfaceBorder, ...webOnly({ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }) };
}

/** Legacy static tokens (classic values). Prefer `useTheme().fonts` / `.radius`. */
export const fonts = themes.classic.light.fonts;
export const radius = themes.classic.light.radius;
