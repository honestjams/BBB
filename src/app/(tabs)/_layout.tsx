import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { useTheme } from '@/theme';

/**
 * Four tabs, thumb-reachable, system-native (Liquid Glass on iOS 26, Material on
 * Android). The old app had six identical tiles and no bottom nav; here the
 * member card is the Home hero and Specials / Stores / You are one tap away.
 */
export default function TabsLayout() {
  const t = useTheme();
  return (
    <NativeTabs
      backgroundColor={t.tabBar}
      tintColor={t.primary}
      iconColor={{ default: t.textMuted, selected: t.primary }}
      labelStyle={{ default: { color: t.textMuted }, selected: { color: t.primary } }}
      minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md={{ default: 'home', selected: 'home_filled' }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="specials">
        <NativeTabs.Trigger.Label>Specials</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'tag', selected: 'tag.fill' }} md={{ default: 'sell', selected: 'sell' }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="stores">
        <NativeTabs.Trigger.Label>Stores</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'mappin.and.ellipse', selected: 'mappin.and.ellipse' }} md={{ default: 'location_on', selected: 'location_on' }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="account">
        <NativeTabs.Trigger.Label>You</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'person.crop.circle', selected: 'person.crop.circle.fill' }} md={{ default: 'account_circle', selected: 'account_circle' }} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
