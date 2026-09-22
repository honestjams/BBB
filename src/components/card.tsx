import { Pressable, StyleSheet, View, type PressableProps, type ViewProps, type ViewStyle } from 'react-native';

import { radius, shadow, space, useTheme } from '@/theme';

type CardProps = ViewProps & { tone?: 'surface' | 'alt' | 'primary' | 'accent'; padded?: boolean };

export function Card({ tone = 'surface', padded = true, style, ...rest }: CardProps) {
  const t = useTheme();
  const bg =
    tone === 'primary' ? t.primary : tone === 'accent' ? t.accent : tone === 'alt' ? t.surfaceAlt : t.surface;
  return (
    <View
      {...rest}
      style={[styles.card, shadow.card, { backgroundColor: bg }, padded && styles.padded, style]}
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
  card: { borderRadius: radius.md, overflow: 'hidden' },
  padded: { padding: space.lg },
});
