import * as Location from 'expo-location';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { RsaFooter } from '@/components/rsa-footer';
import { Screen } from '@/components/screen';
import { StoreRow } from '@/components/store-row';
import { Text } from '@/components/text';
import { distanceKm, stores } from '@/data/stores';
import { useAppState } from '@/state/app-state';
import { space, useTheme } from '@/theme';

type Coords = { lat: number; lng: number };

export default function StoresScreen() {
  const t = useTheme();
  const { homeStoreId } = useAppState();
  const [coords, setCoords] = useState<Coords | null>(null);
  const [perm, setPerm] = useState<'unknown' | 'granted' | 'denied'>('unknown');

  useEffect(() => {
    Location.getForegroundPermissionsAsync()
      .then((p) => {
        if (p.granted) return locate();
        setPerm('denied');
      })
      .catch(() => setPerm('denied'));
  }, []);

  async function locate() {
    try {
      const p = await Location.requestForegroundPermissionsAsync();
      if (!p.granted) return setPerm('denied');
      setPerm('granted');
      const pos =
        (await Location.getLastKnownPositionAsync()) ??
        (await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }));
      setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    } catch {
      setPerm('denied');
    }
  }

  const sorted = useMemo(() => {
    const withDistance = stores.map((s) => ({
      store: s,
      km: coords ? distanceKm(coords.lat, coords.lng, s.lat, s.lng) : undefined,
    }));
    if (coords) return withDistance.sort((a, b) => (a.km ?? 0) - (b.km ?? 0));
    // No location: home store first, then alphabetical.
    return withDistance.sort((a, b) =>
      a.store.id === homeStoreId ? -1 : b.store.id === homeStoreId ? 1 : a.store.name.localeCompare(b.store.name),
    );
  }, [coords, homeStoreId]);

  return (
    <Screen title="Find a Bob's" eyebrow={`${stores.length} stores across Queensland`}>
      {perm !== 'granted' && (
        <View style={styles.pad}>
          <Card tone="alt" style={styles.locate}>
            <View style={{ flex: 1 }}>
              <Text variant="heading">Sort by distance</Text>
              <Text variant="caption" color="muted">
                Turn on location to see the closest store first.
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={locate}
              style={({ pressed }) => [styles.locateBtn, { backgroundColor: t.primary, borderRadius: t.radius.pill, opacity: pressed ? 0.85 : 1 }]}>
              <Text variant="bodyStrong" style={{ color: t.primaryText }}>
                Use location
              </Text>
            </Pressable>
          </Card>
        </View>
      )}

      <View style={[styles.pad, { gap: space.md }]}>
        {sorted.map(({ store, km }) => (
          <StoreRow key={store.id} store={store} distanceKm={km} isHome={store.id === homeStoreId} />
        ))}
      </View>

      <View style={styles.pad}>
        <Text variant="caption" color="muted">
          Don’t have a Bob’s near you? Trust us, we’re working on it.
        </Text>
      </View>
      <RsaFooter />
    </Screen>
  );
}

const styles = StyleSheet.create({
  pad: { paddingHorizontal: space.lg },
  locate: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  locateBtn: { paddingHorizontal: space.lg, minHeight: 44, justifyContent: 'center' },
});
