import { AlfaSlabOne_400Regular } from '@expo-google-fonts/alfa-slab-one';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, type ReactNode } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { AppStateProvider, useAppState } from '@/state/app-state';
import { useTheme } from '@/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    AlfaSlabOne_400Regular,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <AppStateProvider>
      <Frame>
        <RootStack />
      </Frame>
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

  return (
    <>
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
      </Stack>
    </>
  );
}

/**
 * On web the app is phone-shaped by design, so wide screens get a centred
 * phone-width frame on a branded backdrop. The width cap is a CSS media query
 * in +html.tsx (keyed off the app-frame id) rather than a JS width check, so the
 * statically rendered HTML already matches and hydration keeps it. Native
 * renders children as-is.
 */
function Frame({ children }: { children: ReactNode }) {
  const t = useTheme();
  if (Platform.OS !== 'web') return children;
  return (
    <View style={styles.backdrop}>
      <View id="app-frame" style={[styles.frame, { backgroundColor: t.bg }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, alignItems: 'center' },
  frame: { flex: 1, width: '100%' },
});
