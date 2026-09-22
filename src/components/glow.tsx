import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme';

/**
 * Soft gradient blobs behind the glass theme. Blurred with a CSS filter on
 * web; native gets the same shapes at lower opacity as a graceful fallback.
 */
export function Glow() {
  const t = useTheme();
  if (!t.glow) return null;
  const [a, b, c] = t.glow;
  return (
    <View pointerEvents="none" style={styles.layer}>
      <View style={[styles.blob, { backgroundColor: a, top: -120, left: -80, width: 380, height: 380 }]} />
      <View style={[styles.blob, { backgroundColor: b, top: 260, right: -140, width: 340, height: 340 }]} />
      <View style={[styles.blob, { backgroundColor: c, bottom: -100, left: 40, width: 360, height: 360 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  layer: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, overflow: 'hidden' },
  blob: { position: 'absolute', borderRadius: 999, opacity: 0.55, filter: 'blur(90px)' },
});
