import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { MemberCard } from '@/components/member-card';
import { RsaFooter } from '@/components/rsa-footer';
import { Screen } from '@/components/screen';
import { Section } from '@/components/section';
import { SpecialTile } from '@/components/special-card';
import { OpenBadge } from '@/components/store-row';
import { Text } from '@/components/text';
import { campaigns, formatEnds, specials } from '@/data/specials';
import { getStore } from '@/data/stores';
import { useAppState } from '@/state/app-state';
import { space, useTheme } from '@/theme';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 17) return 'Arvo';
  return 'Evening';
}

export default function HomeScreen() {
  const t = useTheme();
  const { member, homeStoreId } = useAppState();
  const store = getStore(homeStoreId);
  const weekly = specials.filter((s) => s.campaign === 'weekly').slice(0, 8);
  const wine = specials.filter((s) => s.campaign === 'wine');

  return (
    <Screen
      eyebrow={`${greeting()}, ${member.firstName}`}
      title="Mate's Rates"
      right={
        store && (
          <Link href={{ pathname: '/store/[id]', params: { id: store.id } }} asChild>
            <Pressable accessibilityRole="button" style={styles.storeChip}>
              <Text variant="caption" color="muted">
                My store
              </Text>
              <Text variant="bodyStrong" color="primary">
                {store.name} ›
              </Text>
            </Pressable>
          </Link>
        )
      }>
      <View style={styles.pad}>
        <MemberCard />
        {store && (
          <View style={{ marginTop: space.sm, alignItems: 'center' }}>
            <OpenBadge store={store} />
          </View>
        )}
      </View>

      <Section
        title="This week"
        caption={`Weekly specials end ${formatEnds(campaigns.weekly.endsOn)}`}
        action={{ label: 'See all', href: '/specials' }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          decelerationRate="fast"
          snapToInterval={156 + space.md}>
          {weekly.map((s) => (
            <SpecialTile key={s.id} special={s} />
          ))}
        </ScrollView>
      </Section>

      <Section
        title="Wine specials"
        caption={`Ends ${formatEnds(campaigns.wine.endsOn)}, while stocks last`}
        action={{ label: 'See all', href: { pathname: '/specials', params: { cat: 'wine' } } }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          decelerationRate="fast"
          snapToInterval={156 + space.md}>
          {wine.map((s) => (
            <SpecialTile key={s.id} special={s} />
          ))}
        </ScrollView>
      </Section>

      <View style={[styles.pad, { gap: space.md }]}>
        <Link href="/bulk-buys" asChild>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}>
            <Card tone="accent" style={styles.promo}>
              <View style={{ flex: 1, gap: 2 }}>
                <Text variant="label" style={{ color: t.accentText }}>
                  Bulk buys
                </Text>
                <Text style={[styles.promoTitle, { fontFamily: t.fonts.display, textTransform: t.displayTransform, color: t.accentText }]}>
                  Buy in bulk and save!
                </Text>
                <Text variant="caption" style={{ color: t.accentText }}>
                  Weddings, clubs, work dos. Get a quote in a couple of taps.
                </Text>
              </View>
              <View style={[styles.promoBtn, { backgroundColor: t.primary, borderRadius: t.radius.pill }]}>
                <Text variant="bodyStrong" style={{ color: t.primaryText }}>
                  Get a quote
                </Text>
              </View>
            </Card>
          </Pressable>
        </Link>

        <Link href="/beat-down" asChild>
          <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}>
            <Card style={styles.guarantee}>
              <View style={[styles.guaranteeIcon, { backgroundColor: t.surfaceAlt }]}>
                <Text style={{ fontSize: 22, lineHeight: 28 }}>🥊</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="heading">Bob’s Beat Down Guarantee</Text>
                <Text variant="caption" color="muted">
                  If we’re not already cheaper, we’ll beat every price.
                </Text>
              </View>
              <Text color="muted" style={{ fontSize: 22, lineHeight: 26 }}>
                ›
              </Text>
            </Card>
          </Pressable>
        </Link>
      </View>

      <RsaFooter />
    </Screen>
  );
}

const styles = StyleSheet.create({
  pad: { paddingHorizontal: space.lg },
  storeChip: { alignItems: 'flex-end', paddingBottom: 4 },
  carousel: { paddingHorizontal: space.lg, gap: space.md },
  promo: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  promoTitle: { fontSize: 20, lineHeight: 26 },
  promoBtn: { paddingHorizontal: space.lg, paddingVertical: space.md },
  guarantee: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  guaranteeIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
});
