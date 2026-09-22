import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Card } from './card';
import { Text } from './text';

import { getOpenStatus, type Store } from '@/data/stores';
import { radius, space, useTheme } from '@/theme';

export function OpenBadge({ store, compact }: { store: Store; compact?: boolean }) {
  const t = useTheme();
  const s = getOpenStatus(store);
  const color = s.open ? (s.closingSoon ? t.accentText : t.success) : t.danger;
  const bg = s.open ? (s.closingSoon ? t.accent : `${t.success}1A`) : `${t.danger}1A`;
  const label = s.open
    ? s.closingSoon
      ? `Closing soon · ${s.closesAt}`
      : `Open · till ${s.closesAt}`
    : `Closed · opens ${s.opensAt} ${s.opensLabel}`;
  return (
    <View style={[styles.badge, { backgroundColor: bg }, compact && { paddingHorizontal: space.sm }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text variant="caption" style={{ color }}>
        {label}
      </Text>
    </View>
  );
}

export function StoreRow({ store, distanceKm, isHome }: { store: Store; distanceKm?: number; isHome?: boolean }) {
  const t = useTheme();
  return (
    <Link href={{ pathname: '/store/[id]', params: { id: store.id } }} asChild>
      <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.92 : 1 }]}>
        <Card style={styles.row}>
          <View style={{ flex: 1, gap: space.xs }}>
            <View style={styles.titleRow}>
              <Text variant="heading">{store.name}</Text>
              {isHome && (
                <View style={[styles.homePill, { backgroundColor: t.primary }]}>
                  <Text variant="label" style={{ color: t.primaryText, fontSize: 10 }}>
                    My store
                  </Text>
                </View>
              )}
            </View>
            <Text variant="caption" color="muted" numberOfLines={1}>
              {store.address}
            </Text>
            <OpenBadge store={store} />
          </View>
          <View style={{ alignItems: 'flex-end', gap: space.xs }}>
            {distanceKm !== undefined && (
              <Text variant="bodyStrong" color="muted">
                {distanceKm < 10 ? distanceKm.toFixed(1) : Math.round(distanceKm)} km
              </Text>
            )}
            <Text color="muted" style={{ fontSize: 22, lineHeight: 26 }}>
              ›
            </Text>
          </View>
        </Card>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  homePill: { paddingHorizontal: space.sm, paddingVertical: 2, borderRadius: radius.pill },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: space.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginTop: 2,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
});
