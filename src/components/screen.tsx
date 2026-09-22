import { ScrollView, StyleSheet, View, type ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from './text';

import { space, useTheme } from '@/theme';

type Props = ScrollViewProps & {
  title?: string;
  eyebrow?: string;
  right?: React.ReactNode;
  /** Extra bottom padding so content clears the tab bar. */
  tabbed?: boolean;
};

export function Screen({ title, eyebrow, right, tabbed = true, children, contentContainerStyle, ...rest }: Props) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bg }}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      {...rest}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + space.md, paddingBottom: (tabbed ? 96 : insets.bottom + space.xl) },
        contentContainerStyle,
      ]}>
      {(title || right) && (
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            {eyebrow && (
              <Text variant="label" color="primary">
                {eyebrow}
              </Text>
            )}
            {title && <Text variant="display">{title}</Text>}
          </View>
          {right}
        </View>
      )}
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { gap: space.xl },
  header: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: space.lg, gap: space.md },
});
