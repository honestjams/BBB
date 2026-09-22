import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from './text';

import { useAppState } from '@/state/app-state';
import { space, themeMeta, themes, useTheme, type ThemeId } from '@/theme';

/**
 * Showcase controls for the business demo. On wide web screens `ShowcasePanel`
 * sits beside the phone frame; on narrow screens `ShowcaseFab` floats above the
 * tab bar and opens the /theme picker. Visibility is toggled by CSS media
 * queries in +html.tsx (ids showcase-panel / showcase-fab), so the statically
 * rendered HTML matches and hydration keeps it.
 */

export function ThemeOption({ id, compact }: { id: ThemeId; compact?: boolean }) {
  const { themeId, setTheme } = useAppState();
  const t = useTheme();
  const meta = themeMeta.find((m) => m.id === id)!;
  const preview = themes[id].light;
  const selected = themeId === id;
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${meta.name} theme`}
      onPress={() => setTheme(id)}
      style={({ pressed }) => [
        styles.option,
        {
          borderRadius: t.radius.md,
          backgroundColor: selected ? t.surfaceAlt : t.surface,
          borderColor: selected ? t.primary : t.style === 'glass' ? t.surfaceBorder : t.line,
          opacity: pressed ? 0.9 : 1,
        },
        compact && styles.optionCompact,
      ]}>
      <View style={[styles.preview, { backgroundColor: preview.bg, borderRadius: preview.radius.sm }, compact && styles.previewCompact]}>
        <View style={[styles.previewHeader, { backgroundColor: preview.primary, borderRadius: preview.radius.sm }]} />
        <View style={[styles.previewCard, { backgroundColor: preview.surface, borderRadius: preview.radius.sm, borderColor: preview.surfaceBorder, borderWidth: preview.style === 'glass' ? 1 : 0 }]}>
          <View style={[styles.previewLine, { backgroundColor: preview.text, width: '60%' }]} />
          <View style={[styles.previewLine, { backgroundColor: preview.textMuted, width: '40%' }]} />
          <View style={[styles.previewPill, { backgroundColor: preview.accent, borderRadius: preview.radius.pill }]} />
        </View>
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <View style={styles.nameRow}>
          <Text variant="heading" style={{ fontFamily: preview.fonts.display, textTransform: preview.displayTransform, fontSize: compact ? 16 : 18 }}>
            {meta.name}
          </Text>
          {selected && (
            <View style={[styles.check, { backgroundColor: t.primary }]}>
              <Text style={{ color: t.primaryText, fontSize: 12, lineHeight: 14 }}>✓</Text>
            </View>
          )}
        </View>
        {!compact && (
          <Text variant="caption" color="muted">
            {meta.tagline}
          </Text>
        )}
        <View style={styles.swatches}>
          {meta.swatches.map((c) => (
            <View key={c} style={[styles.swatch, { backgroundColor: c, borderColor: t.line }]} />
          ))}
        </View>
      </View>
    </Pressable>
  );
}

/** Desktop side panel, rendered on the backdrop outside the phone frame. */
export function ShowcasePanel() {
  return (
    <View id="showcase-panel" style={styles.panel}>
      <View style={{ gap: 2 }}>
        <Text variant="label" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Showcase
        </Text>
        <Text variant="title" style={{ color: '#FFFFFF' }}>
          Design directions
        </Text>
        <Text variant="caption" style={{ color: 'rgba(255,255,255,0.75)' }}>
          Pick a direction and the live app restyles. Same screens, same content, different look. Follows your
          system light/dark setting.
        </Text>
      </View>
      <View style={{ gap: space.sm }}>
        {themeMeta.map((m) => (
          <PanelOption key={m.id} id={m.id} />
        ))}
      </View>
      <Text variant="caption" style={{ color: 'rgba(255,255,255,0.55)' }}>
        Prototype for discussion. Member data is mocked; specials are the September catalogue.
      </Text>
    </View>
  );
}

function PanelOption({ id }: { id: ThemeId }) {
  const { themeId, setTheme } = useAppState();
  const meta = themeMeta.find((m) => m.id === id)!;
  const preview = themes[id].light;
  const selected = themeId === id;
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={() => setTheme(id)}
      style={({ pressed }) => [
        styles.panelOption,
        { borderColor: selected ? '#FFFFFF' : 'rgba(255,255,255,0.18)', backgroundColor: selected ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)', opacity: pressed ? 0.85 : 1 },
      ]}>
      <View style={styles.swatches}>
        {meta.swatches.map((c) => (
          <View key={c} style={[styles.swatch, { backgroundColor: c, borderColor: 'rgba(255,255,255,0.3)' }]} />
        ))}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#FFFFFF', fontFamily: preview.fonts.display, fontSize: 16, lineHeight: 20, textTransform: preview.displayTransform }}>
          {meta.name}
        </Text>
        <Text variant="caption" style={{ color: 'rgba(255,255,255,0.7)' }}>
          {meta.tagline}
        </Text>
      </View>
      <View style={[styles.radio, { borderColor: '#FFFFFF' }]}>{selected && <View style={styles.radioDot} />}</View>
    </Pressable>
  );
}

/** Floating button for narrow screens; opens the /theme picker. */
export function ShowcaseFab() {
  const t = useTheme();
  return (
    <Link href="/theme" asChild>
      <Pressable
        id="showcase-fab"
        accessibilityRole="button"
        accessibilityLabel="Change design direction"
        // Link asChild merges styles by spreading, so this must be one plain object.
        style={{ ...styles.fab, backgroundColor: t.primary }}>
        <Text style={{ fontSize: 20, lineHeight: 24 }}>🎨</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  option: { flexDirection: 'row', gap: space.md, padding: space.md, borderWidth: 1.5, alignItems: 'center' },
  optionCompact: { padding: space.sm },
  preview: { width: 96, height: 120, padding: 8, gap: 6, overflow: 'hidden' },
  previewCompact: { width: 64, height: 80, padding: 6, gap: 4 },
  previewHeader: { height: 14, width: '70%' },
  previewCard: { flex: 1, padding: 6, gap: 4 },
  previewLine: { height: 5, borderRadius: 3, opacity: 0.8 },
  previewPill: { height: 8, width: '45%', marginTop: 'auto' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  check: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  swatches: { flexDirection: 'row', gap: 4, marginTop: 4 },
  swatch: { width: 16, height: 16, borderRadius: 8, borderWidth: 1 },
  panel: { width: 280, padding: space.xl, gap: space.xl, justifyContent: 'center' },
  panelOption: { flexDirection: 'row', alignItems: 'center', gap: space.md, padding: space.md, borderRadius: 14, borderWidth: 1 },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FFFFFF' },
  fab: {
    position: 'absolute',
    right: space.lg,
    bottom: 112,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
  },
});
