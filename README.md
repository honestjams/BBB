# Bob's Bulk Booze — members app (v2)

A ground-up redesign of the Bob's Bulk Booze members app. Expo SDK 57, Expo Router, TypeScript.
One codebase for iOS, Android and the web: the web build is a static export deployed on Vercel.

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
npm run web             # dev server in the browser
npx expo start          # Expo Go works for everything except brightness/location prompts
npx expo run:ios        # dev build with all native modules
```

`npm run typecheck` and `npm run lint` should both be clean.

## Design directions (showcase)

For the business presentation the app ships with a theme switcher. On wide screens a
"Design directions" panel sits beside the phone frame; on phones the 🎨 button (or
You → Appearance) opens the same picker. The choice persists per device.

- **Bob's Classic**: the brand as it is today (burgundy, orange, Alfa Slab One).
- **Glass**: dark glow backdrop, frosted translucent cards, floating glass dock, Outfit type.
- **Big Box**: price-led retail in the style of the majors (deep green, yellow, Oswald condensed).

Themes are full token sets in `src/theme/themes.ts` (colour, type, radius, surface style,
member-card and age-gate palettes). `useTheme()` returns the active one; components read
`t.fonts`, `t.radius`, `t.style` rather than static tokens.

## Web and Vercel

`npm run build` runs `expo export -p web` and writes a static site to `dist/` (one HTML page
per route, including every special and store via `generateStaticParams`). `vercel.json` sets the
build command, output directory, clean URLs, an SPA fallback rewrite and immutable caching for
hashed assets. The GitHub repo is linked to Vercel, so **pushing to `main` deploys**.

What differs on web:

- Tabs come from `src/app/(tabs)/_layout.web.tsx` (headless `expo-router/ui` tabs drawn as a
  bottom bar); native keeps `NativeTabs`.
- Wide screens get a centred phone-width frame on a burgundy backdrop (`Frame` in the root
  layout plus `+html.tsx`), so the mobile layout is never stretched across a desktop.
- `Alert`/`Share` are no-ops in react-native-web, so screens use `src/lib/dialogs.ts`, which
  falls back to browser dialogs and the clipboard.
- Deep links (for example `/special/xxxx-gold`) have no history, so close buttons use
  `goBack()` from `src/lib/navigation.ts`, which falls back to a sensible route.
- Brightness boost on the card and haptics are native-only and are skipped.
- `public/manifest.webmanifest` and `+html.tsx` make it installable as a PWA.

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
src/lib/                 cross-platform helpers (dialogs, back navigation)
src/state/               persisted app state (AsyncStorage / localStorage on web)
src/theme/               tokens: colours, fonts, spacing, radius
src/app/+html.tsx        root HTML for the static web export (meta, manifest, backdrop)
public/                  static web files (manifest, PWA icons)
vercel.json              Vercel build/output/rewrites
```

## What is mocked

- Member profile and points are hard-coded in `src/data/member.ts`.
- Specials: the four wine lines are the live Sept 2026 catalogue; the rest are placeholders
  flagged `live: false`. Swap for the catalogue feed.
- Bulk-buy quotes hand off to a pre-filled email until a quotes endpoint exists.
- Store coordinates are approximate suburb centroids, used only for sorting.
