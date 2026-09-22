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
import { useEffect } from 'react';

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
      <RootStack />
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
