import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { Linking, Platform, Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { RsaFooter } from '@/components/rsa-footer';
import { Screen } from '@/components/screen';
import { OpenBadge } from '@/components/store-row';
import { Text } from '@/components/text';
import { getStore } from '@/data/stores';
import { useAppState } from '@/state/app-state';
import { radius, space, useTheme } from '@/theme';

export default function StoreDetail() {
  const t = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const store = getStore(id);
  const { homeStoreId, setHomeStore } = useAppState();

  if (!store) {
    return (
      <Screen tabbed={false} title="Store not found">
        <View style={styles.pad}>
          <Button title="Back" onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  const isHome = homeStoreId === store.id;
  const today = new Date().getDay();
  const q = encodeURIComponent(`Bob's Bulk Booze ${store.address}`);
  const mapsUrl = Platform.select({
    ios: `maps://?q=${q}`,
    default: `https://www.google.com/maps/search/?api=1&query=${q}`,
  });

  return (
    <Screen tabbed={false} contentContainerStyle={{ paddingTop: space.lg }}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.back()} hitSlop={12} style={[styles.iconBtn, { backgroundColor: t.surface }]}>
          <Text style={{ fontSize: 20, lineHeight: 24 }}>‹</Text>
        </Pressable>
      </View>

      <View style={[styles.pad, { gap: space.xs }]}>
        <Text variant="label" color="primary">
          Bob’s {store.suburb !== store.name ? store.suburb : 'Bulk Booze'}
        </Text>
        <Text variant="display">{store.name}</Text>
        <Text variant="body" color="muted">
          {store.address}
        </Text>
        <View style={{ marginTop: space.xs }}>
          <OpenBadge store={store} />
        </View>
      </View>

      <View style={[styles.pad, styles.actions]}>
        <Button title="Directions" size="lg" style={{ flex: 1 }} onPress={() => Linking.openURL(mapsUrl).catch(() => undefined)} />
        <Button
          title="Call"
          variant="outline"
          size="lg"
          style={{ flex: 1 }}
          onPress={() => Linking.openURL(`tel:${store.phone.replace(/\s/g, '')}`).catch(() => undefined)}
        />
      </View>

      <View style={styles.pad}>
        <Card padded={false}>
          <View style={[styles.cardHeader, { borderBottomColor: t.line }]}>
            <Text variant="heading">Opening hours</Text>
          </View>
          {store.hours.map((h) => {
            const isToday = h.dayIdx.includes(today);
            return (
              <View key={h.days} style={[styles.hoursRow, isToday && { backgroundColor: t.surfaceAlt }]}>
                <Text variant={isToday ? 'bodyStrong' : 'body'}>{h.days}</Text>
                <Text variant={isToday ? 'bodyStrong' : 'body'} color={isToday ? 'primary' : 'text'}>
                  {h.open} – {h.close}
                </Text>
              </View>
            );
          })}
        </Card>
      </View>

      <View style={styles.pad}>
        <Card padded={false}>
          <Pressable
            accessibilityRole="button"
            onPress={() => Linking.openURL(`tel:${store.phone.replace(/\s/g, '')}`).catch(() => undefined)}
            style={styles.hoursRow}>
            <Text>Phone</Text>
            <Text variant="bodyStrong" color="primary">
              {store.phone}
            </Text>
          </Pressable>
        </Card>
      </View>

      <View style={styles.pad}>
        {isHome ? (
          <Card tone="alt" style={styles.homeCard}>
            <Text style={{ fontSize: 22, lineHeight: 28 }}>★</Text>
            <Text variant="bodyStrong" style={{ flex: 1 }}>
              This is your store. Specials and hours on Home come from here.
            </Text>
          </Card>
        ) : (
          <Button
            title="Make this my store"
            variant="accent"
            size="lg"
            fullWidth
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
              setHomeStore(store.id);
            }}
          />
        )}
      </View>
      <RsaFooter />
    </Screen>
  );
}

const styles = StyleSheet.create({
  pad: { paddingHorizontal: space.lg },
  topBar: { paddingHorizontal: space.lg },
  iconBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  actions: { flexDirection: 'row', gap: space.md },
  cardHeader: { paddingHorizontal: space.lg, paddingVertical: space.md, borderBottomWidth: StyleSheet.hairlineWidth },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: space.lg,
    minHeight: 52,
    borderRadius: radius.sm,
  },
  homeCard: { flexDirection: 'row', alignItems: 'center', gap: space.md },
});
