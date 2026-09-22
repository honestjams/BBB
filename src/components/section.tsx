import { Link, type Href } from 'expo-router';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { Text } from './text';

import { space } from '@/theme';

type Props = ViewProps & { title: string; caption?: string; action?: { label: string; href: Href } };

export function Section({ title, caption, action, children, style, ...rest }: Props) {
  return (
    <View {...rest} style={[styles.section, style]}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text variant="title">{title}</Text>
          {caption && (
            <Text variant="caption" color="muted">
              {caption}
            </Text>
          )}
        </View>
        {action && (
          <Link href={action.href}>
            <Text variant="bodyStrong" color="primary">
              {action.label} ›
            </Text>
          </Link>
        )}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: space.md },
  header: { flexDirection: 'row', alignItems: 'flex-end', gap: space.md, paddingHorizontal: space.lg },
});
