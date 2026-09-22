import { Pressable, StyleSheet } from 'react-native';

import { Text } from './text';

import { glassSurface, space, useTheme } from '@/theme';

type Props = { label: string; selected?: boolean; onPress?: () => void };

export function Chip({ label, selected, onPress }: Props) {
  const t = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          borderRadius: t.radius.pill,
          backgroundColor: selected ? t.primary : t.surface,
          borderColor: selected ? t.primary : t.style === 'glass' ? t.surfaceBorder : t.line,
          opacity: pressed ? 0.85 : 1,
        },
        !selected && glassSurface(t),
      ]}>
      <Text variant="caption" style={{ color: selected ? t.primaryText : t.text }}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 40,
    paddingHorizontal: space.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
