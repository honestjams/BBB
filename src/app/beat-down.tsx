import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Screen } from '@/components/screen';
import { Text } from '@/components/text';
import { beatDownTerms } from '@/data/member';
import { goBack } from '@/lib/navigation';
import { space, useTheme } from '@/theme';

export default function BeatDown() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Screen tabbed={false} contentContainerStyle={{ paddingTop: space.xl, paddingBottom: insets.bottom + space.xl }}>
      <View style={[styles.hero, { backgroundColor: t.accent, borderRadius: t.radius.lg }]}>
        <Text style={{ fontSize: 44, lineHeight: 52 }}>🥊</Text>
        <Text style={[styles.heroTitle, { fontFamily: t.fonts.display, textTransform: t.displayTransform, color: t.accentText }]}>Bob’s Beat Down Guarantee</Text>
        <Text variant="bodyStrong" style={{ color: t.accentText, textAlign: 'center' }}>
          If we’re not already cheaper, we’ll beat every price.
        </Text>
      </View>

      <View style={[styles.pad, { gap: space.md }]}>
        <Text variant="heading">How it works</Text>
        <Text variant="body">
          Spot the same item advertised cheaper at a competitor within 10 km? Show the current ad to staff at the counter
          and we’ll beat it on the spot.
        </Text>
        <Text variant="heading" style={{ marginTop: space.sm }}>
          The fine print
        </Text>
        <View style={{ gap: space.sm }}>
          {beatDownTerms.map((term, i) => (
            <View key={i} style={styles.term}>
              <View style={[styles.bullet, { backgroundColor: t.primary }]} />
              <Text variant="caption" color="muted" style={{ flex: 1 }}>
                {term}
              </Text>
            </View>
          ))}
        </View>
        <Button title="Got it" size="lg" fullWidth onPress={() => goBack()} style={{ marginTop: space.md }} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  pad: { paddingHorizontal: space.lg },
  hero: { marginHorizontal: space.lg, padding: space.xl, alignItems: 'center', gap: space.sm },
  heroTitle: { fontSize: 26, lineHeight: 32, textAlign: 'center' },
  term: { flexDirection: 'row', gap: space.md, alignItems: 'flex-start' },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 7 },
});
