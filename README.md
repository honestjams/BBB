# Bob's Bulk Booze — members app (v2)

A ground-up redesign of the Bob's Bulk Booze members app. Expo SDK 57, Expo Router, TypeScript.

## Why a redesign

The current app (Bobsbb on the App Store) is a loyalty wallet with six identical tiles, no
navigation, and the one thing people actually use (the QR card the counter scans) buried
at the bottom. This version keeps the same job and makes it obvious:

- **Member card first.** It is the Home hero and opens full-screen in one tap from Home,
  You, or any special. Brightness goes to max while it is open so the scanner reads it.
- **Four tabs, thumb-reachable.** Home · Specials · Stores · You. System-native tab bar
  (Liquid Glass on iOS 26, Material on Android).
- **Price hierarchy matches the shelf talkers.** Member price is the hero, non-member price
  and saving are secondary, so app and store read as one system.
- **Stores that know if they are open.** Open / closing soon / closed computed from real
  hours, nearest first when location is allowed, directions and call in one tap.
- **One primary action per screen.** No dark patterns, 48pt tap targets, dark mode,
  haptics on the actions that matter, 18+ gate once.

Brand tokens come straight from bobsbulkbooze.com.au: burgundy `#A01C33`, orange
`#F69D25`, Alfa Slab One for display type, Poppins for everything else.

## Run it

```sh
npm install
npx expo start          # Expo Go works for everything except brightness/location prompts
npx expo run:ios        # dev build with all native modules
```

`npx tsc --noEmit` and `npx expo lint` should both be clean.

## Structure

```
src/app/                 routes (Expo Router)
  _layout.tsx            root stack, fonts, 18+ gate via Stack.Protected
  (tabs)/                Home, Specials, Stores, You
  card.tsx               full-screen member QR (form sheet)
  special/[id].tsx       deal detail
  store/[id].tsx         store detail
  bulk-buys.tsx          quote request
  beat-down.tsx          price guarantee terms
  age-gate.tsx
src/components/          Text, Button, Card, Chip, PriceTag, SpecialTile/Row, StoreRow, MemberCard…
src/data/                stores (real, from the website), specials (4 live + placeholders), member (mock)
src/state/               persisted app state (AsyncStorage)
src/theme/               tokens: colours, fonts, spacing, radius
```

## What is mocked

- Member profile and points are hard-coded in `src/data/member.ts`.
- Specials: the four wine lines are the live Sept 2026 catalogue; the rest are placeholders
  flagged `live: false`. Swap for the catalogue feed.
- Bulk-buy quotes hand off to a pre-filled email until a quotes endpoint exists.
- Store coordinates are approximate suburb centroids, used only for sorting.
