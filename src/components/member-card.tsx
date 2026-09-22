import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Text } from './text';

import { useAppState } from '@/state/app-state';
import { brand, fonts, radius, shadow, space } from '@/theme';

/**
 * The member card is the single most-used thing in the app (it is what gets
 * scanned at the counter), so it lives at the top of Home and opens full-screen
 * in one tap. Colours are fixed brand colours, not theme colours, so the card
 * looks the same in dark mode and to the scanner.
 */
export function MemberCard() {
  const { member } = useAppState();
  return (
    <Link href="/card" asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open your member card full screen"
        style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.985 : 1 }] }]}>
        <View style={[styles.card, shadow.card]}>
          <View style={styles.stripe} />
          <View style={styles.left}>
            <Text variant="label" style={{ color: brand.orange }}>
              {member.tier}
            </Text>
            <Text style={styles.name} numberOfLines={1}>
              {member.firstName} {member.lastName}
            </Text>
            <Text style={styles.number}>{member.memberNumber.replace(/(\d{4})(\d{4})/, '$1 $2')}</Text>
            <View style={styles.cta}>
              <Text variant="caption" style={{ color: brand.white }}>
                Tap to show at the counter
              </Text>
              <Text style={{ color: brand.orange, fontSize: 18, lineHeight: 20 }}>›</Text>
            </View>
          </View>
          <View style={styles.qrWrap}>
            <QRCode value={member.memberNumber} size={84} backgroundColor={brand.white} color={brand.burgundyDeep} />
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: brand.burgundy,
    borderRadius: radius.lg,
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
    backgroundColor: brand.burgundyDark,
    transform: [{ rotate: '18deg' }],
  },
  left: { flex: 1, gap: 2 },
  name: { fontFamily: fonts.bold, fontSize: 18, lineHeight: 24, color: brand.white },
  number: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20, color: brand.white, opacity: 0.85, letterSpacing: 1 },
  cta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: space.sm },
  qrWrap: { backgroundColor: brand.white, padding: 8, borderRadius: radius.sm },
});
