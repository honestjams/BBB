import { TabList, TabSlot, TabTrigger, Tabs, type TabTriggerSlotProps } from 'expo-router/ui';
import { forwardRef, type ComponentType } from 'react';
import { Pressable, StyleSheet, View, type View as ViewType } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeIcon, PersonIcon, PinIcon, TagIcon } from '@/components/tab-icons';
import { Text } from '@/components/text';
import { space, useTheme, webOnly } from '@/theme';

/**
 * Web replacement for the native tab bar (`_layout.tsx` keeps NativeTabs for
 * iOS/Android). Headless tabs from expo-router/ui. Solid themes draw a flush
 * bottom bar; the glass theme draws a floating frosted dock.
 */
type Icon = ComponentType<{ color: string; size?: number; filled?: boolean }>;
const tabs: { name: string; href: '/' | '/specials' | '/stores' | '/account'; label: string; Icon: Icon }[] = [
  { name: 'index', href: '/', label: 'Home', Icon: HomeIcon },
  { name: 'specials', href: '/specials', label: 'Specials', Icon: TagIcon },
  { name: 'stores', href: '/stores', label: 'Stores', Icon: PinIcon },
  { name: 'account', href: '/account', label: 'You', Icon: PersonIcon },
];

export default function TabsLayout() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const glass = t.style === 'glass';
  return (
    <Tabs style={{ flex: 1 }}>
      <TabSlot style={{ flex: 1, backgroundColor: t.bg }} />
      <TabList
        style={
          glass
            ? [
                styles.dock,
                { backgroundColor: t.tabBar, borderColor: t.tabBarBorder, bottom: insets.bottom + space.lg },
                webOnly({ backdropFilter: 'blur(28px) saturate(160%)', WebkitBackdropFilter: 'blur(28px) saturate(160%)' }),
              ]
            : [styles.bar, { backgroundColor: t.tabBar, borderTopColor: t.tabBarBorder, paddingBottom: insets.bottom }]
        }>
        {tabs.map(({ name, href, label, Icon }) => (
          <TabTrigger key={name} name={name} href={href} asChild>
            <TabButton label={label} Icon={Icon} />
          </TabTrigger>
        ))}
      </TabList>
    </Tabs>
  );
}

type TabButtonProps = TabTriggerSlotProps & { label: string; Icon: Icon };

const TabButton = forwardRef<ViewType, TabButtonProps>(function TabButton({ label, Icon, isFocused, ...props }, ref) {
  const t = useTheme();
  const glass = t.style === 'glass';
  const retail = t.id === 'retail';
  // Retail bar is dark green: white icons, yellow when active. Others use primary on a light bar.
  const activeColor = retail ? t.accent : glass ? '#FFFFFF' : t.primary;
  const idleColor = retail ? 'rgba(255,255,255,0.72)' : t.textMuted;
  const color = isFocused ? activeColor : idleColor;
  return (
    <Pressable
      ref={ref}
      {...props}
      accessibilityRole="tab"
      accessibilityState={{ selected: !!isFocused }}
      accessibilityLabel={label}
      style={({ pressed }) => [styles.tab, glass && styles.dockTab, pressed && { opacity: 0.7 }]}>
      <View style={[styles.iconWrap, glass && isFocused && { backgroundColor: 'rgba(255,255,255,0.16)' }]}>
        <Icon color={color} filled={!!isFocused} size={glass ? 22 : 24} />
      </View>
      <Text
        style={[
          styles.label,
          { color, fontFamily: isFocused ? t.fonts.semibold : t.fonts.medium },
          retail && { fontFamily: t.fonts.display, textTransform: 'uppercase', letterSpacing: 0.8, fontSize: 12 },
        ]}>
        {label}
      </Text>
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
  dock: {
    position: 'absolute',
    left: space.lg,
    right: space.lg,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: space.sm,
    boxShadow: '0 16px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)',
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4, minHeight: 56, paddingBottom: space.sm },
  dockTab: { minHeight: 60, paddingBottom: 4, gap: 2 },
  iconWrap: { width: 40, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 11, lineHeight: 14, letterSpacing: 0.2 },
});
