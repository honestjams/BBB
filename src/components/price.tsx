import { StyleSheet, View } from 'react-native';

import { Text } from './text';

import { formatPrice, saving, type Special } from '@/data/specials';
import { space, useTheme } from '@/theme';

/**
 * Member price is the hero. Non-member price and saving are secondary.
 * Same hierarchy as the in-store shelf talkers, so it reads as one system.
 * The retail direction swaps the saving pill for a loud yellow price burst.
 */
export function PriceTag({ special, size = 'md' }: { special: Special; size?: 'md' | 'lg' }) {
  const t = useTheme();
  const [dollars, cents] = formatPrice(special.memberPrice).slice(1).split('.');
  const big = size === 'lg';
  const retail = t.id === 'retail';
  const priceColor = retail ? t.text : t.primary;
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Text style={[styles.sup, { fontFamily: t.fonts.display, color: priceColor, fontSize: big ? 18 : 14, lineHeight: big ? 26 : 20 }]}>$</Text>
        <Text style={{ fontFamily: t.fonts.display, color: priceColor, fontSize: big ? (retail ? 56 : 48) : retail ? 38 : 32, lineHeight: big ? 56 : 38 }}>
          {dollars}
        </Text>
        <Text style={[styles.sup, { fontFamily: t.fonts.display, color: priceColor, fontSize: big ? 18 : 14, lineHeight: big ? 26 : 20 }]}>
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
        <View style={[styles.savePill, { backgroundColor: t.accent, borderRadius: t.radius.pill }]}>
          <Text variant="caption" style={{ color: t.accentText, fontFamily: retail ? t.fonts.display : t.fonts.bold, textTransform: retail ? 'uppercase' : 'none' }}>
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
  sup: { marginTop: 2 },
  saveRow: { flexDirection: 'row', alignItems: 'center', gap: space.sm, marginTop: space.xs, flexWrap: 'wrap' },
  savePill: { paddingHorizontal: space.sm, paddingVertical: 2 },
});
