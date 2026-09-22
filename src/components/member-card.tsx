import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Text } from './text';

import { useAppState } from '@/state/app-state';
import { glassSurface, shadow, space, useTheme } from '@/theme';

/**
 * The member card is the single most-used thing in the app (it is what gets
 * scanned at the counter), so it lives at the top of Home and opens full-screen
 * in one tap. Colours come from the theme's memberCard tokens so each design
 * direction has its own card, while the QR stays high-contrast for the scanner.
 */
export function MemberCard() {
  const { member } = useAppState();
  const t = useTheme();
  const c = t.memberCard;
  const glass = t.style === 'glass';
  return (
    <Link href="/card" asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open your member card full screen"
        style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.985 : 1 }] }]}>
        <View style={[styles.card, { backgroundColor: c.bg, borderRadius: t.radius.lg }, glass ? glassSurface(t) : shadow.card]}>
          <View style={[styles.stripe, { backgroundColor: c.stripe }]} />
          <View style={styles.left}>
            <Text variant="label" style={{ color: c.accent }}>
              {member.tier}
            </Text>
            <Text style={[styles.name, { fontFamily: t.fonts.bold, color: c.text }]} numberOfLines={1}>
              {member.firstName} {member.lastName}
            </Text>
            <Text style={[styles.number, { fontFamily: t.fonts.medium, color: c.subtle }]}>
              {member.memberNumber.replace(/(\d{4})(\d{4})/, '$1 $2')}
            </Text>
            <View style={styles.cta}>
              <Text variant="caption" style={{ color: c.text }}>
                Tap to show at the counter
              </Text>
              <Text style={{ color: c.accent, fontSize: 18, lineHeight: 20 }}>›</Text>
            </View>
          </View>
          <View style={[styles.qrWrap, { borderRadius: t.radius.sm }]}>
            <QRCode value={member.memberNumber} size={84} backgroundColor="#FFFFFF" color={c.qr} />
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: space.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
    overflow: 'hidden',
    minHeight: 132,
  },
  stripe: {
    position: 'absolute',
    right: -40,
    top: -60,
    width: 180,
    height: 260,
    transform: [{ rotate: '18deg' }],
  },
  left: { flex: 1, gap: 2 },
  name: { fontSize: 18, lineHeight: 24 },
  number: { fontSize: 14, lineHeight: 20, letterSpacing: 1 },
  cta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: space.sm },
  qrWrap: { backgroundColor: '#FFFFFF', padding: 8 },
});
