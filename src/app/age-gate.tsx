import * as Haptics from 'expo-haptics';
import { Linking, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Text } from '@/components/text';
import { useAppState } from '@/state/app-state';
import { brand, fonts, radius, space } from '@/theme';

/**
 * 18+ gate, shown once. Required under the Liquor Act. Deliberately plain:
 * one question, two buttons, no dark patterns.
 */
export default function AgeGate() {
  const insets = useSafeAreaInsets();
  const { setAgeVerified } = useAppState();
  return (
    <View style={[styles.screen, { paddingTop: insets.top + space.xxl, paddingBottom: insets.bottom + space.xl }]}>
      <View style={styles.logo}>
        <Text style={styles.bobs}>Bob’s</Text>
        <Text style={styles.bulk}>BULK BOOZE</Text>
      </View>

      <View style={styles.card}>
        <Text variant="display" style={{ color: brand.burgundyDeep, textAlign: 'center' }}>
          Are you 18 or over?
        </Text>
        <Text variant="body" style={{ color: brand.inkMuted, textAlign: 'center' }}>
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
          <Button
            title="No, take me away"
            variant="ghost"
            fullWidth
            onPress={() => Linking.openURL('https://www.drinkwise.org.au/')}
          />
        </View>
      </View>

      <Text variant="caption" style={{ color: brand.white, opacity: 0.85, textAlign: 'center' }}>
        Liquor Act 2007: it is against the law to sell or supply liquor to, or to obtain on behalf of, a person under the
        age of 18 years.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: brand.orange, paddingHorizontal: space.xl, justifyContent: 'space-between' },
  logo: { alignItems: 'center' },
  bobs: { fontFamily: fonts.display, fontSize: 64, lineHeight: 70, color: brand.burgundy },
  bulk: { fontFamily: fonts.display, fontSize: 22, lineHeight: 26, color: brand.white, letterSpacing: 3, marginTop: -6 },
  card: { backgroundColor: brand.white, borderRadius: radius.lg, padding: space.xl, gap: space.md },
});
