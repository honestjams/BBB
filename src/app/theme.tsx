import { Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Screen } from '@/components/screen';
import { Text } from '@/components/text';
import { ThemeOption } from '@/components/theme-switcher';
import { goBack } from '@/lib/navigation';
import { space, themeMeta, useTheme } from '@/theme';

/** Showcase picker: swap the whole app between the three design directions. */
export default function ThemePicker() {
  const t = useTheme();
  return (
    <Screen tabbed={false} contentContainerStyle={{ paddingTop: space.lg }}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={() => goBack()} hitSlop={12} style={[styles.iconBtn, { backgroundColor: t.surface }]}>
          <Text style={{ fontSize: 18, lineHeight: 22 }}>✕</Text>
        </Pressable>
      </View>
      <View style={[styles.pad, { gap: 2 }]}>
        <Text variant="label" color="primary">
          Showcase
        </Text>
        <Text variant="display">Design directions</Text>
        <Text variant="body" color="muted">
          Same screens and content, three different looks. Pick one and the whole app restyles. Your choice is remembered on this device.
        </Text>
      </View>
      <View style={[styles.pad, { gap: space.md }]}>
        {themeMeta.map((m) => (
          <ThemeOption key={m.id} id={m.id} />
        ))}
      </View>
      <View style={styles.pad}>
        <Button title="Done" size="lg" fullWidth onPress={() => goBack()} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  pad: { paddingHorizontal: space.lg },
  topBar: { paddingHorizontal: space.lg },
  iconBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
});
