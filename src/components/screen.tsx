import Head from 'expo-router/head';
import { Platform, ScrollView, StyleSheet, View, type ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Glow } from './glow';
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
  // The floating glass dock needs more clearance than a flush tab bar.
  const tabClearance = t.style === 'glass' ? 128 : 96;
  return (
    <>
      {Platform.OS === 'web' && title && (
        <Head>
          <title>{`${title} · Bob’s Bulk Booze`}</title>
        </Head>
      )}
      <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Glow />
      <ScrollView
        style={{ flex: 1, backgroundColor: 'transparent' }}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        {...rest}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + space.md, paddingBottom: tabbed ? tabClearance : insets.bottom + space.xl },
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: { gap: space.xl },
  header: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: space.lg, gap: space.md },
});
