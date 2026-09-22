import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Card } from './card';
import { Text } from './text';

import { formatPrice, saving, type Special } from '@/data/specials';
import { useAppState } from '@/state/app-state';
import { fonts, radius, space, useTheme } from '@/theme';

function Swatch({ special, size }: { special: Special; size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius.sm,
        backgroundColor: special.tone,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{ fontSize: size * 0.45, lineHeight: size * 0.6 }}>{special.emoji}</Text>
    </View>
  );
}

function HeartButton({ id }: { id: string }) {
  const { isFavourite, toggleFavourite } = useAppState();
  const t = useTheme();
  const fav = isFavourite(id);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={fav ? 'Remove from favourites' : 'Save to favourites'}
      hitSlop={10}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
        toggleFavourite(id);
      }}
      style={[styles.heart, { backgroundColor: t.surface }]}>
      <Text style={{ fontSize: 16, lineHeight: 20, color: fav ? t.primary : t.textMuted }}>{fav ? '♥' : '♡'}</Text>
    </Pressable>
  );
}

/** Compact tile for horizontal carousels. */
export function SpecialTile({ special }: { special: Special }) {
  const t = useTheme();
  return (
    <Link href={{ pathname: '/special/[id]', params: { id: special.id } }} asChild>
      <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}>
        <Card style={styles.tile} padded={false}>
          <View style={{ padding: space.md, gap: space.sm }}>
            <View style={{ position: 'relative' }}>
              <Swatch special={special} size={132} />
              <View style={styles.tileHeart}>
                <HeartButton id={special.id} />
              </View>
            </View>
            <View>
              <Text variant="bodyStrong" numberOfLines={1}>
                {special.name}
              </Text>
              <Text variant="caption" color="muted" numberOfLines={1}>
                {[special.variant, special.size].filter(Boolean).join(' · ')}
              </Text>
            </View>
            <View style={styles.tilePriceRow}>
              <Text style={{ fontFamily: fonts.display, fontSize: 24, lineHeight: 28, color: t.primary }}>
                {formatPrice(special.memberPrice)}
              </Text>
              <View style={[styles.savePill, { backgroundColor: t.accent }]}>
                <Text variant="caption" style={{ color: t.accentText, fontFamily: fonts.bold, fontSize: 12 }}>
                  -{formatPrice(saving(special))}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </Pressable>
    </Link>
  );
}

/** Full-width row for the Specials list. */
export function SpecialRow({ special }: { special: Special }) {
  const t = useTheme();
  return (
    <Link href={{ pathname: '/special/[id]', params: { id: special.id } }} asChild>
      <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}>
        <Card padded={false} style={styles.row}>
          <Swatch special={special} size={84} />
          <View style={{ flex: 1, gap: 2 }}>
            <Text variant="bodyStrong" numberOfLines={1}>
              {special.name}
              {special.variant ? ` ${special.variant}` : ''}
            </Text>
            <Text variant="caption" color="muted">
              {special.size}
            </Text>
            <View style={styles.rowPrice}>
              <Text style={{ fontFamily: fonts.display, fontSize: 22, lineHeight: 26, color: t.primary }}>
                {formatPrice(special.memberPrice)}
              </Text>
              <Text variant="caption" color="muted" style={{ textDecorationLine: 'line-through' }}>
                {formatPrice(special.nonMemberPrice)}
              </Text>
            </View>
          </View>
          <HeartButton id={special.id} />
        </Card>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  tile: { width: 156 },
  tileHeart: { position: 'absolute', top: 6, right: 6 },
  tilePriceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  savePill: { paddingHorizontal: space.sm, paddingVertical: 2, borderRadius: radius.pill },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md, padding: space.md },
  rowPrice: { flexDirection: 'row', alignItems: 'baseline', gap: space.sm, marginTop: 2 },
  heart: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
