import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { fonts, useTheme } from '@/theme';

type Variant = 'display' | 'title' | 'heading' | 'body' | 'bodyStrong' | 'caption' | 'label' | 'price';

const variants: Record<Variant, TextStyle> = {
  display: { fontFamily: fonts.display, fontSize: 34, lineHeight: 40, letterSpacing: -0.5 },
  title: { fontFamily: fonts.display, fontSize: 24, lineHeight: 30 },
  heading: { fontFamily: fonts.bold, fontSize: 17, lineHeight: 24 },
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 22 },
  bodyStrong: { fontFamily: fonts.semibold, fontSize: 15, lineHeight: 22 },
  caption: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 18 },
  label: { fontFamily: fonts.bold, fontSize: 11, lineHeight: 14, letterSpacing: 1.2, textTransform: 'uppercase' },
  price: { fontFamily: fonts.display, fontSize: 28, lineHeight: 32 },
};

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
  return <RNText {...rest} style={[variants[variant], { color: colors[color] }, style]} />;
}
