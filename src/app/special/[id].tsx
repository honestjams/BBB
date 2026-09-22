import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { PriceTag } from '@/components/price';
import { RsaFooter } from '@/components/rsa-footer';
import { Screen } from '@/components/screen';
import { Text } from '@/components/text';
import { campaigns, formatEnds, formatPrice, getSpecial, savingPercent, specials } from '@/data/specials';
import { getStore } from '@/data/stores';
import { share } from '@/lib/dialogs';
import { goBack } from '@/lib/navigation';
import { useAppState } from '@/state/app-state';
import { space, useTheme } from '@/theme';

/** Static web export: one HTML page per special so links can be shared. */
export function generateStaticParams(): { id: string }[] {
  return specials.map((s) => ({ id: s.id }));
}

export default function SpecialDetail() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const special = getSpecial(id);
  const { isFavourite, toggleFavourite, homeStoreId } = useAppState();
  const store = getStore(homeStoreId);

  if (!special) {
    return (
      <Screen tabbed={false} title="Not found">
        <View style={styles.pad}>
          <Button title="Back to specials" onPress={() => goBack('/specials')} />
        </View>
      </Screen>
    );
  }

  const fav = isFavourite(special.id);

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Screen tabbed={false} contentContainerStyle={{ paddingTop: space.lg, paddingBottom: 140 }}>
        <View style={styles.topBar}>
          <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={() => goBack('/specials')} hitSlop={12} style={[styles.iconBtn, { backgroundColor: t.surface }]}>
            <Text style={{ fontSize: 18, lineHeight: 22 }}>✕</Text>
          </Pressable>
          <View style={{ flexDirection: 'row', gap: space.sm }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Share"
              hitSlop={12}
              onPress={() =>
                share(
                  `${special.name}${special.variant ? ` ${special.variant}` : ''} ${special.size} is ${formatPrice(
                    special.memberPrice,
                  )} for members at Bob's Bulk Booze (non-member ${formatPrice(special.nonMemberPrice)}). Ends ${formatEnds(special.endsOn)}.`,
                )
              }
              style={[styles.iconBtn, { backgroundColor: t.surface }]}>
              <Text style={{ fontSize: 18, lineHeight: 22 }}>↗</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={fav ? 'Remove from saved' : 'Save'}
              hitSlop={12}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => undefined);
                toggleFavourite(special.id);
              }}
              style={[styles.iconBtn, { backgroundColor: fav ? t.primary : t.surface }]}>
              <Text style={{ fontSize: 18, lineHeight: 22, color: fav ? t.primaryText : t.text }}>{fav ? '♥' : '♡'}</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.hero, { backgroundColor: special.tone, borderRadius: t.radius.lg }]}>
          <Text style={{ fontSize: 112, lineHeight: 130 }}>{special.emoji}</Text>
          <View style={[styles.savePill, { backgroundColor: t.primary, borderRadius: t.radius.pill }]}>
            <Text variant="label" style={{ color: t.primaryText }}>
              Save {savingPercent(special)}%
            </Text>
          </View>
        </View>

        <View style={[styles.pad, { gap: space.lg }]}>
          <View style={{ gap: 2 }}>
            <Text variant="label" color="muted">
              {campaigns[special.campaign].label} · ends {formatEnds(special.endsOn)}
            </Text>
            <Text variant="display">{special.name}</Text>
            {special.variant && (
              <Text variant="heading" color="muted">
                {special.variant}
              </Text>
            )}
            <Text variant="body" color="muted">
              {special.size}
            </Text>
          </View>

          <Card>
            <PriceTag special={special} size="lg" />
          </Card>

          {special.blurb && <Text variant="body">{special.blurb}</Text>}

          <Card tone="alt" style={{ gap: space.xs }}>
            <Text variant="heading">How to get this price</Text>
            <Text variant="caption" color="muted">
              Show your member card at the counter{store ? ` at ${store.name}` : ''}. The member price applies automatically,
              no code needed. While stocks last.
            </Text>
          </Card>

          {!special.live && (
            <Text variant="caption" color="muted">
              Sample listing. Live specials are pulled from the catalogue feed.
            </Text>
          )}
        </View>
        <RsaFooter />
      </Screen>

      <View style={[styles.stickyBar, { paddingBottom: insets.bottom + space.md, backgroundColor: t.bg, borderTopColor: t.line }]}>
        <Button title="Show member card" size="lg" fullWidth onPress={() => router.push('/card')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pad: { paddingHorizontal: space.lg },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: space.lg },
  iconBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  hero: {
    marginHorizontal: space.lg,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  savePill: { position: 'absolute', top: space.md, left: space.md, paddingHorizontal: space.md, paddingVertical: 6 },
  stickyBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
