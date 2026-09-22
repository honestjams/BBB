import * as Brightness from 'expo-brightness';
import { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Glow } from '@/components/glow';
import { Text } from '@/components/text';
import { getStore } from '@/data/stores';
import { goBack } from '@/lib/navigation';
import { useAppState } from '@/state/app-state';
import { space, useTheme } from '@/theme';

/**
 * Full-screen member card. Brightness goes to max while it is open so the
 * counter scanner reads it first time, then restores on close. The QR panel
 * is always white with a dark code regardless of theme, for the scanner.
 */
export default function CardScreen() {
  const insets = useSafeAreaInsets();
  const { member, homeStoreId } = useAppState();
  const store = getStore(homeStoreId);
  const t = useTheme();
  const c = t.memberCard;
  // Glass card colours are translucent; the full-screen view needs a solid backdrop behind them.
  const screenBg = t.style === 'glass' ? t.bg : c.bg;

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
    <View style={[styles.screen, { backgroundColor: screenBg, paddingTop: insets.top + space.lg, paddingBottom: insets.bottom + space.lg }]}>
      <Glow />
      <View style={styles.header}>
        <View>
          <Text variant="label" style={{ color: c.accent }}>
            {member.tier}
          </Text>
          <Text style={[styles.name, { fontFamily: t.fonts.bold, color: c.text }]}>
            {member.firstName} {member.lastName}
          </Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={() => goBack()} hitSlop={12} style={styles.close}>
          <Text style={{ color: c.text, fontSize: 20, lineHeight: 24 }}>✕</Text>
        </Pressable>
      </View>

      <View style={[styles.qrCard, { borderRadius: t.radius.lg }]}>
        <QRCode value={member.memberNumber} size={240} backgroundColor="#FFFFFF" color={c.qr} quietZone={8} />
        <Text style={[styles.number, { fontFamily: t.fonts.display, color: c.qr }]}>{member.memberNumber.replace(/(\d{4})(\d{4})/, '$1 $2')}</Text>
        <Text variant="caption" style={{ color: '#6E6560', textAlign: 'center' }}>
          Show this at the counter. Member pricing applies automatically.
        </Text>
      </View>

      <View style={{ gap: space.md, alignItems: 'center' }}>
        <View style={styles.pointsRow}>
          <View style={styles.stat}>
            <Text style={[styles.statValue, { fontFamily: t.fonts.display, color: c.text }]}>{member.points.toLocaleString('en-AU')}</Text>
            <Text variant="label" style={{ color: c.subtle }}>
              points
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={[styles.statValue, { fontFamily: t.fonts.display, color: c.text }]}>{store?.name ?? '—'}</Text>
            <Text variant="label" style={{ color: c.subtle }}>
              my store
            </Text>
          </View>
        </View>
        <Button title="Done" variant="accent" size="lg" onPress={() => goBack()} style={{ minWidth: 200 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: space.xl,
    justifyContent: 'space-between',
  },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  name: { fontSize: 22, lineHeight: 28 },
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
    backgroundColor: '#FFFFFF',
    padding: space.xl,
    alignItems: 'center',
    gap: space.md,
    width: '100%',
    maxWidth: 340,
  },
  number: { fontSize: 28, lineHeight: 34, letterSpacing: 2 },
  pointsRow: { flexDirection: 'row', alignItems: 'center', gap: space.xl },
  stat: { alignItems: 'center', gap: 2 },
  statValue: { fontSize: 22, lineHeight: 28 },
  divider: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.3)' },
});
