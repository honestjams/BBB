import * as Haptics from 'expo-haptics';
import { Linking, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Glow } from '@/components/glow';
import { Text } from '@/components/text';
import { useAppState } from '@/state/app-state';
import { space, useTheme } from '@/theme';

/**
 * 18+ gate, shown once. Required under the Liquor Act. Deliberately plain:
 * one question, two buttons, no dark patterns.
 */
export default function AgeGate() {
  const insets = useSafeAreaInsets();
  const { setAgeVerified } = useAppState();
  const t = useTheme();
  const g = t.ageGate;
  return (
    <View style={[styles.screen, { backgroundColor: g.bg, paddingTop: insets.top + space.xxl, paddingBottom: insets.bottom + space.xl }]}>
      <Glow />
      <View style={styles.logo}>
        <Text style={[styles.bobs, { fontFamily: t.fonts.display, color: g.logo }]}>Bob’s</Text>
        <Text style={[styles.bulk, { fontFamily: t.fonts.display, color: g.logoSub }]}>BULK BOOZE</Text>
      </View>

      <Card style={{ padding: space.xl, gap: space.md, borderRadius: t.radius.lg }}>
        <Text variant="display" style={{ color: g.title, textAlign: 'center' }}>
          Are you 18 or over?
        </Text>
        <Text variant="body" style={{ color: g.body, textAlign: 'center' }}>
          You need to be 18+ to use this app. We take the Responsible Service of Alcohol seriously.
        </Text>
        <View style={{ gap: space.sm, marginTop: space.sm }}>
          <Button
            title="Yes, I'm 18 or over"
            size="lg"
            fullWidth
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
              setAgeVerified(true);
            }}
          />
          <Button title="No, take me away" variant="ghost" fullWidth onPress={() => Linking.openURL('https://www.drinkwise.org.au/')} />
        </View>
      </Card>

      <Text variant="caption" style={{ color: g.logoSub, opacity: 0.85, textAlign: 'center' }}>
        Liquor Act 2007: it is against the law to sell or supply liquor to, or to obtain on behalf of, a person under the
        age of 18 years.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: space.xl, justifyContent: 'space-between' },
  logo: { alignItems: 'center' },
  bobs: { fontSize: 64, lineHeight: 70 },
  bulk: { fontSize: 22, lineHeight: 26, letterSpacing: 3, marginTop: -6 },
});
