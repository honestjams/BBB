import { type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { ThemeContext } from './index';
import { themes } from './themes';

import { useAppState } from '@/state/app-state';

/** Resolves the persisted design direction plus the system colour scheme. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const { themeId } = useAppState();
  const scheme = useColorScheme();
  const theme = themes[themeId][scheme === 'dark' ? 'dark' : 'light'];
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
