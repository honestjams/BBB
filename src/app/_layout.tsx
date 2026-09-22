import { AlfaSlabOne_400Regular } from '@expo-google-fonts/alfa-slab-one';
import { Oswald_500Medium, Oswald_700Bold } from '@expo-google-fonts/oswald';
import { Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold } from '@expo-google-fonts/outfit';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider as NavigationThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, type ReactNode } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { ShowcaseFab, ShowcasePanel } from '@/components/theme-switcher';
import { AppStateProvider, useAppState } from '@/state/app-state';
import { useTheme } from '@/theme';
import { ThemeProvider } from '@/theme/provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    AlfaSlabOne_400Regular,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Oswald_500Medium,
    Oswald_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <AppStateProvider>
      <ThemeProvider>
        <Frame>
          <RootStack />
        </Frame>
      </ThemeProvider>
    </AppStateProvider>
  );
}

function RootStack() {
  const t = useTheme();
  const { ready, ageVerified } = useAppState();

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => undefined);
  }, [ready]);

  if (!ready) return null;

  // React Navigation paints its own background behind every screen (light grey by
  // default), which would show through transparent screens, so it follows the theme.
  const base = t.scheme === 'dark' ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...base,
    colors: { ...base.colors, background: t.bg, card: t.surface, text: t.text, border: t.line, primary: t.primary },
  };

  return (
    <NavigationThemeProvider value={navTheme}>
      <StatusBar style={t.scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: t.bg },
        }}>
        <Stack.Protected guard={ageVerified}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="card"
            options={{ presentation: 'formSheet', sheetAllowedDetents: [0.92], sheetGrabberVisible: true }}
          />
          <Stack.Screen name="special/[id]" options={{ presentation: 'modal' }} />
          <Stack.Screen name="store/[id]" />
          <Stack.Screen name="bulk-buys" options={{ presentation: 'modal' }} />
          <Stack.Screen name="beat-down" options={{ presentation: 'formSheet', sheetAllowedDetents: [0.7], sheetGrabberVisible: true }} />
        </Stack.Protected>
        <Stack.Protected guard={!ageVerified}>
          <Stack.Screen name="age-gate" options={{ gestureEnabled: false, animation: 'fade' }} />
        </Stack.Protected>
        {/* Showcase picker is reachable from every state, including the age gate. */}
        <Stack.Screen name="theme" options={{ presentation: 'modal' }} />
      </Stack>
    </NavigationThemeProvider>
  );
}

/**
 * On web the app is phone-shaped by design, so wide screens get a centred
 * phone-width frame on a branded backdrop with the showcase panel beside it.
 * Width caps and panel/fab visibility are CSS media queries in +html.tsx
 * (ids app-frame, showcase-panel, showcase-fab) rather than JS width checks,
 * so the statically rendered HTML already matches and hydration keeps it.
 * Native renders children as-is.
 */
function Frame({ children }: { children: ReactNode }) {
  const t = useTheme();
  if (Platform.OS !== 'web') return children;
  return (
    <View style={[styles.backdrop, { backgroundColor: t.backdrop }]}>
      <ShowcasePanel />
      <View id="app-frame" style={[styles.frame, { backgroundColor: t.bg }]}>
        {children}
        <ShowcaseFab />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch' },
  frame: { flex: 1, overflow: 'hidden' },
});
