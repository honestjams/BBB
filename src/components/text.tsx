import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { useTheme, type Theme } from '@/theme';

type Variant = 'display' | 'title' | 'heading' | 'body' | 'bodyStrong' | 'caption' | 'label' | 'price';

const cache = new Map<string, Record<Variant, TextStyle>>();

/** Type scale per theme. Display faces differ a lot in width, so sizes are tuned per direction. */
function variantsFor(t: Theme): Record<Variant, TextStyle> {
  const key = `${t.id}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const f = t.fonts;
  const retail = t.id === 'retail';
  const v: Record<Variant, TextStyle> = {
    display: {
      fontFamily: f.display,
      fontSize: retail ? 38 : 34,
      lineHeight: retail ? 42 : 40,
      letterSpacing: t.displayTracking,
      textTransform: t.displayTransform,
    },
    title: { fontFamily: f.display, fontSize: retail ? 26 : 24, lineHeight: 30, textTransform: t.displayTransform, letterSpacing: retail ? 0.3 : 0 },
    heading: { fontFamily: f.bold, fontSize: 17, lineHeight: 24 },
    body: { fontFamily: f.regular, fontSize: 15, lineHeight: 22 },
    bodyStrong: { fontFamily: f.semibold, fontSize: 15, lineHeight: 22 },
    caption: { fontFamily: f.medium, fontSize: 13, lineHeight: 18 },
    label: { fontFamily: f.bold, fontSize: 11, lineHeight: 14, letterSpacing: 1.2, textTransform: 'uppercase' },
    price: { fontFamily: f.display, fontSize: 28, lineHeight: 32 },
  };
  cache.set(key, v);
  return v;
}

export type AppTextProps = TextProps & {
  variant?: Variant;
  color?: 'text' | 'muted' | 'primary' | 'accent' | 'inverse' | 'success' | 'danger';
};

export function Text({ variant = 'body', color = 'text', style, ...rest }: AppTextProps) {
  const t = useTheme();
  const colors = {
    text: t.text,
    muted: t.textMuted,
    primary: t.primary,
    accent: t.accent,
    inverse: t.primaryText,
    success: t.success,
    danger: t.danger,
  };
  return <RNText {...rest} style={[variantsFor(t)[variant], { color: colors[color] }, style]} />;
}
