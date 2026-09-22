import { StyleSheet, View } from 'react-native';

import { Text } from './text';

import { formatPrice, saving, type Special } from '@/data/specials';
import { fonts, radius, space, useTheme } from '@/theme';

/**
 * Member price is the hero. Non-member price and saving are secondary.
 * Same hierarchy as the in-store shelf talkers, so it reads as one system.
 */
export function PriceTag({ special, size = 'md' }: { special: Special; size?: 'md' | 'lg' }) {
  const t = useTheme();
  const [dollars, cents] = formatPrice(special.memberPrice).slice(1).split('.');
  const big = size === 'lg';
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Text style={[styles.sup, { color: t.primary, fontSize: big ? 18 : 14, lineHeight: big ? 26 : 20 }]}>$</Text>
        <Text style={{ fontFamily: fonts.display, color: t.primary, fontSize: big ? 48 : 32, lineHeight: big ? 52 : 36 }}>
          {dollars}
        </Text>
        <Text style={[styles.sup, { color: t.primary, fontSize: big ? 18 : 14, lineHeight: big ? 26 : 20 }]}>
          .{cents}
        </Text>
      </View>
      <Text variant="label" color="primary">
        Member price
      </Text>
      <View style={[styles.saveRow]}>
        <Text variant="caption" color="muted">
          Non-member {formatPrice(special.nonMemberPrice)}
        </Text>
        <View style={[styles.savePill, { backgroundColor: t.accent }]}>
          <Text variant="caption" style={{ color: t.accentText, fontFamily: fonts.bold }}>
            Save {formatPrice(saving(special))}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 2 },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  sup: { fontFamily: fonts.display, marginTop: 2 },
  saveRow: { flexDirection: 'row', alignItems: 'center', gap: space.sm, marginTop: space.xs, flexWrap: 'wrap' },
  savePill: { paddingHorizontal: space.sm, paddingVertical: 2, borderRadius: radius.pill },
});
