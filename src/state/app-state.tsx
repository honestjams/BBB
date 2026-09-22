import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { member as mockMember, type Member } from '@/data/member';
import { DEFAULT_THEME, type ThemeId } from '@/theme/themes';

type Persisted = {
  ageVerified: boolean;
  homeStoreId: string;
  favourites: string[];
  notifyWeekly: boolean;
  notifyWine: boolean;
  /** Design direction chosen in the showcase switcher. */
  themeId: ThemeId;
};

const DEFAULTS: Persisted = {
  ageVerified: false,
  homeStoreId: mockMember.homeStoreId,
  favourites: [],
  notifyWeekly: true,
  notifyWine: true,
  themeId: DEFAULT_THEME,
};

const KEY = 'bbb.state.v1';

type AppState = Persisted & {
  ready: boolean;
  member: Member;
  setAgeVerified: (v: boolean) => void;
  setHomeStore: (id: string) => void;
  toggleFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
  setNotify: (key: 'notifyWeekly' | 'notifyWine', v: boolean) => void;
  setTheme: (id: ThemeId) => void;
};

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(DEFAULTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (raw) {
          const saved = JSON.parse(raw) as Partial<Persisted>;
          if (saved.themeId && !['classic', 'glass', 'retail'].includes(saved.themeId)) delete saved.themeId;
          setState({ ...DEFAULTS, ...saved });
        }
      })
      .catch(() => undefined)
      .finally(() => setReady(true));
  }, []);

  const update = useCallback((patch: Partial<Persisted> | ((s: Persisted) => Partial<Persisted>)) => {
    setState((prev) => {
      const next = { ...prev, ...(typeof patch === 'function' ? patch(prev) : patch) };
      AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => undefined);
      return next;
    });
  }, []);

  const value = useMemo<AppState>(
    () => ({
      ...state,
      ready,
      member: mockMember,
      setAgeVerified: (v) => update({ ageVerified: v }),
      setHomeStore: (id) => update({ homeStoreId: id }),
      toggleFavourite: (id) =>
        update((s) => ({
          favourites: s.favourites.includes(id) ? s.favourites.filter((f) => f !== id) : [...s.favourites, id],
        })),
      isFavourite: (id) => state.favourites.includes(id),
      setNotify: (key, v) => update({ [key]: v }),
      setTheme: (id) => update({ themeId: id }),
    }),
    [state, ready, update],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState(): AppState {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAppState must be used inside AppStateProvider');
  return v;
}
