import { Link } from 'expo-router';
import { Linking, Pressable, StyleSheet, Switch, View } from 'react-native';

import { Card } from '@/components/card';
import { RsaFooter } from '@/components/rsa-footer';
import { Screen } from '@/components/screen';
import { Section } from '@/components/section';
import { SpecialRow } from '@/components/special-card';
import { Text } from '@/components/text';
import { benefits } from '@/data/member';
import { specials } from '@/data/specials';
import { getStore } from '@/data/stores';
import { confirm, notice } from '@/lib/dialogs';
import { useAppState } from '@/state/app-state';
import { space, useTheme } from '@/theme';

function Row({ label, value, onPress, href }: { label: string; value?: string; onPress?: () => void; href?: string }) {
  const t = useTheme();
  const inner = (
    <View style={[styles.row, { borderBottomColor: t.line }]}>
      <Text variant="body" style={{ flex: 1 }}>
        {label}
      </Text>
      {value && (
        <Text variant="bodyStrong" color="muted">
          {value}
        </Text>
      )}
      <Text color="muted" style={{ fontSize: 20, lineHeight: 24 }}>
        ›
      </Text>
    </View>
  );
  if (href) {
    return (
      <Link href={href as never} asChild>
        <Pressable accessibilityRole="button">{inner}</Pressable>
      </Link>
    );
  }
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      {inner}
    </Pressable>
  );
}

export default function AccountScreen() {
  const t = useTheme();
  const { member, homeStoreId, favourites, notifyWeekly, notifyWine, setNotify, setAgeVerified } = useAppState();
  const store = getStore(homeStoreId);
  const saved = specials.filter((s) => favourites.includes(s.id));
  const progress = member.points / (member.points + member.pointsToNextReward);

  return (
    <Screen title={`${member.firstName} ${member.lastName}`} eyebrow={member.tier}>
      <View style={[styles.pad, { gap: space.md }]}>
        <Card tone="primary" style={{ gap: space.md }}>
          <View style={styles.pointsRow}>
            <View>
              <Text variant="label" style={{ color: t.memberCard.accent }}>
                Points balance
              </Text>
              <Text style={[styles.points, { fontFamily: t.fonts.display, color: t.memberCard.text }]}>{member.points.toLocaleString('en-AU')}</Text>
            </View>
            <Link href="/card" asChild>
              {/* Link asChild children must get a single style object, not an array (expo-router web check). */}
              <Pressable accessibilityRole="button" style={{ ...styles.cardBtn, backgroundColor: t.accent, borderRadius: t.radius.pill }}>
                <Text variant="bodyStrong" style={{ color: t.accentText }}>
                  Show card
                </Text>
              </Pressable>
            </Link>
          </View>
          <View>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${Math.round(progress * 100)}%`, backgroundColor: t.memberCard.accent }]} />
            </View>
            <Text variant="caption" style={{ color: t.memberCard.text, opacity: 0.9, marginTop: 6 }}>
              {member.pointsToNextReward} points to your next reward
            </Text>
          </View>
        </Card>

        <Card padded={false}>
          <Row label="Member number" value={member.memberNumber} onPress={() => notice('Member number', member.memberNumber)} />
          <Row label="My store" value={store?.name} href="/stores" />
          <Row label="Mobile" value={member.mobile} onPress={() => notice('Update details', 'Update your details at the counter or call your store.')} />
          <Row label="Email" value={member.email} onPress={() => notice('Update details', 'Update your details at the counter or call your store.')} />
        </Card>
      </View>

      <Section title="Your benefits">
        <View style={[styles.pad, { gap: space.sm }]}>
          {benefits.map((b) => (
            <Card key={b.id} style={{ gap: 2 }}>
              <Text variant="heading">{b.title}</Text>
              <Text variant="caption" color="muted">
                {b.body}
              </Text>
            </Card>
          ))}
        </View>
      </Section>

      <Section title="Saved specials" action={saved.length ? { label: 'See all', href: { pathname: '/specials', params: { cat: 'saved' } } } : undefined}>
        <View style={[styles.pad, { gap: space.sm }]}>
          {saved.length === 0 ? (
            <Card tone="alt">
              <Text variant="caption" color="muted">
                Tap the heart on a special to keep it here for your next visit.
              </Text>
            </Card>
          ) : (
            saved.slice(0, 3).map((s) => <SpecialRow key={s.id} special={s} />)
          )}
        </View>
      </Section>

      <Section title="Notifications">
        <View style={styles.pad}>
          <Card padded={false}>
            <View style={[styles.row, { borderBottomColor: t.line }]}>
              <View style={{ flex: 1 }}>
                <Text>Weekly specials</Text>
                <Text variant="caption" color="muted">
                  Every Wednesday when the new catalogue drops
                </Text>
              </View>
              <Switch value={notifyWeekly} onValueChange={(v) => setNotify('notifyWeekly', v)} trackColor={{ true: t.primary }} />
            </View>
            <View style={[styles.row, { borderBottomColor: t.line }]}>
              <View style={{ flex: 1 }}>
                <Text>Wine specials</Text>
                <Text variant="caption" color="muted">
                  Monthly wine deals and new arrivals
                </Text>
              </View>
              <Switch value={notifyWine} onValueChange={(v) => setNotify('notifyWine', v)} trackColor={{ true: t.primary }} />
            </View>
          </Card>
        </View>
      </Section>

      <Section title="More">
        <View style={styles.pad}>
          <Card padded={false}>
            <Row label="Appearance" value="Showcase" href="/theme" />
            <Row label="Bob's Beat Down Guarantee" href="/beat-down" />
            <Row label="Bulk buys and quotes" href="/bulk-buys" />
            <Row label="Careers" onPress={() => Linking.openURL('https://bobsbulkbooze.com.au/careers/')} />
            <Row label="Contact us" onPress={() => Linking.openURL('https://bobsbulkbooze.com.au/contact-us/')} />
            <Row label="Privacy and terms" onPress={() => Linking.openURL('https://bobsbulkbooze.com.au/about-us/')} />
            <Row
              label="Sign out"
              onPress={() =>
                confirm('Sign out?', 'You will need to confirm your age again next time.', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Sign out', style: 'destructive', onPress: () => setAgeVerified(false) },
                ])
              }
            />
          </Card>
        </View>
      </Section>
      <RsaFooter />
    </Screen>
  );
}

const styles = StyleSheet.create({
  pad: { paddingHorizontal: space.lg },
  pointsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space.md },
  points: { fontSize: 40, lineHeight: 46 },
  cardBtn: { paddingHorizontal: space.lg, minHeight: 44, justifyContent: 'center' },
  track: { height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.25)', overflow: 'hidden' },
  fill: { height: 8, borderRadius: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingHorizontal: space.lg,
    minHeight: 56,
    paddingVertical: space.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
