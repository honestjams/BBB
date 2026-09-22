import { TabList, TabSlot, TabTrigger, Tabs, type TabTriggerSlotProps } from 'expo-router/ui';
import { forwardRef, type ComponentType } from 'react';
import { Pressable, StyleSheet, type View as ViewType } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeIcon, PersonIcon, PinIcon, TagIcon } from '@/components/tab-icons';
import { Text } from '@/components/text';
import { fonts, space, useTheme } from '@/theme';

/**
 * Web replacement for the native tab bar (`_layout.tsx` keeps NativeTabs for
 * iOS/Android). Headless tabs from expo-router/ui, drawn as a bottom bar so it
 * matches the phone app and stays thumb-reachable on mobile web.
 */
const tabs: { name: string; href: '/' | '/specials' | '/stores' | '/account'; label: string; Icon: ComponentType<{ color: string; size?: number; filled?: boolean }> }[] = [
  { name: 'index', href: '/', label: 'Home', Icon: HomeIcon },
  { name: 'specials', href: '/specials', label: 'Specials', Icon: TagIcon },
  { name: 'stores', href: '/stores', label: 'Stores', Icon: PinIcon },
  { name: 'account', href: '/account', label: 'You', Icon: PersonIcon },
];

export default function TabsLayout() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Tabs style={{ flex: 1 }}>
      <TabSlot style={{ flex: 1 }} />
      <TabList style={[styles.bar, { backgroundColor: t.tabBar, borderTopColor: t.line, paddingBottom: insets.bottom }]}>
        {tabs.map(({ name, href, label, Icon }) => (
          <TabTrigger key={name} name={name} href={href} asChild>
            <TabButton label={label} Icon={Icon} />
          </TabTrigger>
        ))}
      </TabList>
    </Tabs>
  );
}

type TabButtonProps = TabTriggerSlotProps & {
  label: string;
  Icon: ComponentType<{ color: string; size?: number; filled?: boolean }>;
};

const TabButton = forwardRef<ViewType, TabButtonProps>(function TabButton({ label, Icon, isFocused, ...props }, ref) {
  const t = useTheme();
  const color = isFocused ? t.primary : t.textMuted;
  return (
    <Pressable
      ref={ref}
      {...props}
      accessibilityRole="tab"
      accessibilityState={{ selected: !!isFocused }}
      accessibilityLabel={label}
      style={({ pressed }) => [styles.tab, pressed && { opacity: 0.7 }]}>
      <Icon color={color} filled={!!isFocused} />
      <Text style={[styles.label, { color, fontFamily: isFocused ? fonts.semibold : fonts.medium }]}>{label}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: space.sm,
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4, minHeight: 56, paddingBottom: space.sm },
  label: { fontSize: 11, lineHeight: 14, letterSpacing: 0.2 },
});
