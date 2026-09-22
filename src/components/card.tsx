import { Pressable, StyleSheet, View, type PressableProps, type ViewProps, type ViewStyle } from 'react-native';

import { glassSurface, shadow, space, useTheme } from '@/theme';

type CardProps = ViewProps & { tone?: 'surface' | 'alt' | 'primary' | 'accent'; padded?: boolean };

/**
 * The one surface primitive. Solid themes get a soft shadow; the glass theme
 * gets a translucent fill, hairline border and backdrop blur instead.
 */
export function Card({ tone = 'surface', padded = true, style, ...rest }: CardProps) {
  const t = useTheme();
  const bg =
    tone === 'primary' ? t.primarySurface : tone === 'accent' ? t.accentSurface : tone === 'alt' ? t.surfaceAlt : t.surface;
  const glass = t.style === 'glass';
  return (
    <View
      {...rest}
      style={[
        styles.card,
        { borderRadius: t.radius.md, backgroundColor: bg },
        glass ? glassSurface(t) : shadow.card,
        padded && styles.padded,
        style,
      ]}
    />
  );
}

type PressableCardProps = Omit<PressableProps, 'style'> & CardProps & { style?: ViewStyle };

export function PressableCard({ tone, padded, style, children, ...rest }: PressableCardProps) {
  return (
    <Pressable {...rest} style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.985 : 1 }], opacity: pressed ? 0.95 : 1 }]}>
      <Card tone={tone} padded={padded} style={style}>
        {children}
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { overflow: 'hidden' },
  padded: { padding: space.lg },
});
