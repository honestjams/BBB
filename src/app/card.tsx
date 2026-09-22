import * as Brightness from 'expo-brightness';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Text } from '@/components/text';
import { getStore } from '@/data/stores';
import { useAppState } from '@/state/app-state';
import { brand, fonts, radius, space } from '@/theme';

/**
 * Full-screen member card. Brightness goes to max while it is open so the
 * counter scanner reads it first time, then restores on close.
 */
export default function CardScreen() {
  const insets = useSafeAreaInsets();
  const { member, homeStoreId } = useAppState();
  const store = getStore(homeStoreId);

  useEffect(() => {
    let previous: number | null = null;
    let cancelled = false;
    (async () => {
      try {
        if (Platform.OS === 'web') return;
        const perm = await Brightness.getPermissionsAsync();
        if (!perm.granted && Platform.OS === 'android') {
          const req = await Brightness.requestPermissionsAsync();
          if (!req.granted) return;
        }
        previous = await Brightness.getBrightnessAsync();
        if (!cancelled) await Brightness.setBrightnessAsync(1);
      } catch {
        // Brightness is a nicety, never a blocker.
      }
    })();
    return () => {
      cancelled = true;
      if (Platform.OS === 'web') return;
      (previous !== null ? Brightness.setBrightnessAsync(previous) : Brightness.restoreSystemBrightnessAsync()).catch(
        () => undefined,
      );
    };
  }, []);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + space.lg, paddingBottom: insets.bottom + space.lg }]}>
      <View style={styles.header}>
        <View>
          <Text variant="label" style={{ color: brand.orange }}>
            {member.tier}
          </Text>
          <Text style={styles.name}>
            {member.firstName} {member.lastName}
          </Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={() => router.back()} hitSlop={12} style={styles.close}>
          <Text style={{ color: brand.white, fontSize: 20, lineHeight: 24 }}>✕</Text>
        </Pressable>
      </View>

      <View style={styles.qrCard}>
        <QRCode value={member.memberNumber} size={240} backgroundColor={brand.white} color={brand.burgundyDeep} quietZone={8} />
        <Text style={styles.number}>{member.memberNumber.replace(/(\d{4})(\d{4})/, '$1 $2')}</Text>
        <Text variant="caption" style={{ color: brand.inkMuted, textAlign: 'center' }}>
          Show this at the counter. Member pricing applies automatically.
        </Text>
      </View>

      <View style={{ gap: space.md, alignItems: 'center' }}>
        <View style={styles.pointsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{member.points.toLocaleString('en-AU')}</Text>
            <Text variant="label" style={{ color: brand.white, opacity: 0.8 }}>
              points
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{store?.name ?? '—'}</Text>
            <Text variant="label" style={{ color: brand.white, opacity: 0.8 }}>
              my store
            </Text>
          </View>
        </View>
        <Button title="Done" variant="accent" size="lg" onPress={() => router.back()} style={{ minWidth: 200 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: brand.burgundy,
    paddingHorizontal: space.xl,
    justifyContent: 'space-between',
  },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  name: { fontFamily: fonts.bold, fontSize: 22, lineHeight: 28, color: brand.white },
  close: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCard: {
    alignSelf: 'center',
    backgroundColor: brand.white,
    borderRadius: radius.lg,
    padding: space.xl,
    alignItems: 'center',
    gap: space.md,
    width: '100%',
    maxWidth: 340,
  },
  number: { fontFamily: fonts.display, fontSize: 28, lineHeight: 34, color: brand.burgundyDeep, letterSpacing: 2 },
  pointsRow: { flexDirection: 'row', alignItems: 'center', gap: space.xl },
  stat: { alignItems: 'center', gap: 2 },
  statValue: { fontFamily: fonts.display, fontSize: 22, lineHeight: 28, color: brand.white },
  divider: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.3)' },
});
