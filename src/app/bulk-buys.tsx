import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Linking, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Chip } from '@/components/chip';
import { Screen } from '@/components/screen';
import { Text } from '@/components/text';
import { stores } from '@/data/stores';
import { useAppState } from '@/state/app-state';
import { fonts, radius, space, useTheme } from '@/theme';

const occasions = ['Wedding', 'Party', 'Sports club', 'Work event', 'Other'] as const;

/**
 * Bulk buy quote. The website has a "Get a quote" button that goes to a
 * contact form; here the request is pre-filled from the member profile and
 * hands off to the store by email until a quotes endpoint exists.
 */
export default function BulkBuys() {
  const t = useTheme();
  const { member, homeStoreId } = useAppState();
  const [occasion, setOccasion] = useState<(typeof occasions)[number]>('Party');
  const [storeId, setStoreId] = useState(homeStoreId);
  const [people, setPeople] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [sent, setSent] = useState(false);

  const store = stores.find((s) => s.id === storeId);
  const canSend = people.trim().length > 0 && notes.trim().length > 0;

  function submit() {
    const subject = encodeURIComponent(`Bulk buy quote · ${occasion} · ${store?.name ?? ''}`);
    const body = encodeURIComponent(
      [
        `Member: ${member.firstName} ${member.lastName} (${member.memberNumber})`,
        `Mobile: ${member.mobile}`,
        `Store: ${store?.name ?? ''}`,
        `Occasion: ${occasion}`,
        `Roughly how many people: ${people}`,
        `When: ${date || 'TBC'}`,
        '',
        'What they need:',
        notes,
      ].join('\n'),
    );
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
    setSent(true);
    Linking.openURL(`mailto:hello@bobsbulkbooze.com.au?subject=${subject}&body=${body}`).catch(() => undefined);
  }

  const inputStyle = [styles.input, { backgroundColor: t.surface, borderColor: t.line, color: t.text }];

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen tabbed={false} contentContainerStyle={{ paddingTop: space.lg }}>
        <View style={styles.topBar}>
          <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={() => router.back()} hitSlop={12} style={[styles.iconBtn, { backgroundColor: t.surface }]}>
            <Text style={{ fontSize: 18, lineHeight: 22 }}>✕</Text>
          </Pressable>
        </View>

        <View style={[styles.pad, { gap: 2 }]}>
          <Text variant="label" color="primary">
            Bulk buys
          </Text>
          <Text variant="display">Buy in bulk and save!</Text>
          <Text variant="body" color="muted">
            Tell us the occasion and rough numbers. {store?.name ?? 'Your store'} will come back with a quote.
          </Text>
        </View>

        {sent ? (
          <View style={styles.pad}>
            <Card tone="alt" style={{ gap: space.sm, alignItems: 'center' }}>
              <Text style={{ fontSize: 40, lineHeight: 48 }}>🍻</Text>
              <Text variant="title" style={{ textAlign: 'center' }}>
                Quote request ready
              </Text>
              <Text variant="caption" color="muted" style={{ textAlign: 'center' }}>
                We opened your mail app with everything filled in. Hit send and {store?.name} will be in touch.
              </Text>
              <Button title="Done" onPress={() => router.back()} style={{ marginTop: space.sm }} />
            </Card>
          </View>
        ) : (
          <>
            <View style={[styles.pad, { gap: space.sm }]}>
              <Text variant="label" color="muted">
                Occasion
              </Text>
              <View style={styles.chips}>
                {occasions.map((o) => (
                  <Chip key={o} label={o} selected={occasion === o} onPress={() => setOccasion(o)} />
                ))}
              </View>
            </View>

            <View style={[styles.pad, { gap: space.sm }]}>
              <Text variant="label" color="muted">
                Pick-up store
              </Text>
              <View style={styles.chips}>
                {stores.map((s) => (
                  <Chip key={s.id} label={s.name} selected={storeId === s.id} onPress={() => setStoreId(s.id)} />
                ))}
              </View>
            </View>

            <View style={[styles.pad, { gap: space.md }]}>
              <View style={{ flexDirection: 'row', gap: space.md }}>
                <View style={{ flex: 1, gap: space.xs }}>
                  <Text variant="label" color="muted">
                    How many people
                  </Text>
                  <TextInput value={people} onChangeText={setPeople} keyboardType="number-pad" placeholder="e.g. 80" placeholderTextColor={t.textMuted} style={inputStyle} />
                </View>
                <View style={{ flex: 1, gap: space.xs }}>
                  <Text variant="label" color="muted">
                    When
                  </Text>
                  <TextInput value={date} onChangeText={setDate} placeholder="e.g. Sat 18 Oct" placeholderTextColor={t.textMuted} style={inputStyle} />
                </View>
              </View>
              <View style={{ gap: space.xs }}>
                <Text variant="label" color="muted">
                  What do you need
                </Text>
                <TextInput
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  placeholder="e.g. 10 cartons of Great Northern, 2 cases of prosecco, some premix for the girls…"
                  placeholderTextColor={t.textMuted}
                  style={[...inputStyle, { minHeight: 120, textAlignVertical: 'top' }]}
                />
              </View>
              <Button title="Request a quote" size="lg" fullWidth disabled={!canSend} style={{ opacity: canSend ? 1 : 0.5 }} onPress={submit} />
              <Text variant="caption" color="muted" style={{ textAlign: 'center' }}>
                Your name, member number and mobile are attached so the store can call you back.
              </Text>
            </View>
          </>
        )}
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  pad: { paddingHorizontal: space.lg },
  topBar: { paddingHorizontal: space.lg },
  iconBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    fontFamily: fonts.regular,
    fontSize: 15,
    minHeight: 52,
  },
});
