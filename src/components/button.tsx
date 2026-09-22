import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, View, type PressableProps, type ViewStyle } from 'react-native';

import { Text } from './text';

import { radius, space, tap, useTheme } from '@/theme';

type Props = Omit<PressableProps, 'style'> & {
  title: string;
  variant?: 'primary' | 'accent' | 'outline' | 'ghost';
  size?: 'md' | 'lg';
  icon?: React.ReactNode;
  style?: ViewStyle;
  fullWidth?: boolean;
};

export function Button({ title, variant = 'primary', size = 'md', icon, style, fullWidth, onPress, ...rest }: Props) {
  const t = useTheme();
  const bg =
    variant === 'primary' ? t.primary : variant === 'accent' ? t.accent : 'transparent';
  const fg =
    variant === 'primary' ? t.primaryText : variant === 'accent' ? t.accentText : t.primary;
  const border = variant === 'outline' ? t.primary : 'transparent';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={(e) => {
        Haptics.selectionAsync().catch(() => undefined);
        onPress?.(e);
      }}
      {...rest}
      style={({ pressed }) => [
        styles.base,
        size === 'lg' && styles.lg,
        { backgroundColor: bg, borderColor: border, opacity: pressed ? 0.85 : 1 },
        fullWidth && { alignSelf: 'stretch' },
        style,
      ]}>
      <View style={styles.row}>
        {icon}
        <Text variant="bodyStrong" style={{ color: fg, fontSize: size === 'lg' ? 17 : 15 }}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: tap,
    paddingHorizontal: space.xl,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lg: { minHeight: 56, paddingHorizontal: space.xxl },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
});
