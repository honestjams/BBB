import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { Chip } from '@/components/chip';
import { RsaFooter } from '@/components/rsa-footer';
import { Screen } from '@/components/screen';
import { SpecialRow } from '@/components/special-card';
import { Text } from '@/components/text';
import { campaigns, categories, formatEnds, specials, type Category } from '@/data/specials';
import { useAppState } from '@/state/app-state';
import { glassSurface, space, useTheme } from '@/theme';

type Filter = Category | 'all' | 'saved';

export default function SpecialsScreen() {
  const t = useTheme();
  const { cat } = useLocalSearchParams<{ cat?: string }>();
  const { favourites } = useAppState();
  const [filter, setFilter] = useState<Filter>((cat as Filter) ?? 'all');
  const [query, setQuery] = useState('');

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return specials
      .filter((s) => (filter === 'all' ? true : filter === 'saved' ? favourites.includes(s.id) : s.category === filter))
      .filter((s) => (q ? `${s.name} ${s.variant ?? ''} ${s.size}`.toLowerCase().includes(q) : true))
      .sort((a, b) => b.nonMemberPrice - b.memberPrice - (a.nonMemberPrice - a.memberPrice));
  }, [filter, query, favourites]);

  const weeklyCount = specials.filter((s) => s.campaign === 'weekly').length;

  return (
    <Screen title="Specials" eyebrow={`${specials.length} deals on now`}>
      <View style={styles.pad}>
        <View style={[styles.search, { backgroundColor: t.surface, borderColor: t.style === 'glass' ? t.surfaceBorder : t.line, borderRadius: t.radius.pill }, glassSurface(t)]}>
          <Text color="muted" style={{ fontSize: 16, lineHeight: 20 }}>
            ⌕
          </Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search beer, wine, spirits…"
            placeholderTextColor={t.textMuted}
            autoCorrect={false}
            clearButtonMode="while-editing"
            style={[styles.input, { color: t.text, fontFamily: t.fonts.regular }]}
            accessibilityLabel="Search specials"
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {categories.map((c) => (
          <Chip key={c.id} label={c.label} selected={filter === c.id} onPress={() => setFilter(c.id)} />
        ))}
        <Chip label={`Saved${favourites.length ? ` (${favourites.length})` : ''}`} selected={filter === 'saved'} onPress={() => setFilter('saved')} />
      </ScrollView>

      <View style={[styles.pad, { gap: space.xs }]}>
        <Text variant="caption" color="muted">
          Weekly specials end {formatEnds(campaigns.weekly.endsOn)} · Wine specials end {formatEnds(campaigns.wine.endsOn)}. While
          stocks last.
        </Text>
      </View>

      <View style={[styles.pad, { gap: space.md }]}>
        {list.length === 0 ? (
          <View style={[styles.empty, { backgroundColor: t.surface, borderRadius: t.radius.md }]}>
            <Text style={{ fontSize: 32, lineHeight: 40 }}>{filter === 'saved' ? '♡' : '🔍'}</Text>
            <Text variant="heading" style={{ textAlign: 'center' }}>
              {filter === 'saved' ? 'Nothing saved yet' : 'No specials match'}
            </Text>
            <Text variant="caption" color="muted" style={{ textAlign: 'center' }}>
              {filter === 'saved'
                ? 'Tap the heart on any special and it will show up here.'
                : 'Try a different word or clear the category filter.'}
            </Text>
          </View>
        ) : (
          list.map((s) => <SpecialRow key={s.id} special={s} />)
        )}
      </View>

      {filter === 'all' && !query && (
        <View style={styles.pad}>
          <Text variant="caption" color="muted">
            Showing {weeklyCount} weekly and {specials.length - weeklyCount} wine specials, biggest saving first.
          </Text>
        </View>
      )}
      <RsaFooter />
    </Screen>
  );
}

const styles = StyleSheet.create({
  pad: { paddingHorizontal: space.lg },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    borderWidth: 1,
    paddingHorizontal: space.lg,
    minHeight: 52,
  },
  input: { flex: 1, fontSize: 15, paddingVertical: space.md },
  chips: { paddingHorizontal: space.lg, gap: space.sm },
  empty: { padding: space.xl, alignItems: 'center', gap: space.sm },
});
