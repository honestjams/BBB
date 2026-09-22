import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

import { brand } from '@/theme';

/**
 * Root HTML for every statically rendered web page. Runs in Node only, so no
 * DOM or browser APIs here. Screen-level <title>/<meta> live in `Screen` via
 * `expo-router/head`.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en-AU">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />
        <title>Bob’s Bulk Booze</title>
        <meta name="description" content="Bob’s Bulk Booze members: your member card, this week’s Mate’s Rates specials and your nearest store." />
        <meta name="application-name" content="Bob’s Bulk Booze" />
        <meta name="apple-mobile-web-app-title" content="Bob’s" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content={brand.cream} />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1A1214" />
        <meta name="color-scheme" content="light dark" />
        <meta property="og:title" content="Bob’s Bulk Booze" />
        <meta property="og:description" content="Member card, Mate’s Rates specials and store finder." />
        <meta property="og:image" content="/icons/icon-512.png" />
        <meta property="og:type" content="website" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icons/icon-192.png" type="image/png" sizes="192x192" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: responsiveLayout }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveLayout = `
html, body { background: ${brand.cream}; }
@media (prefers-color-scheme: dark) { html, body { background: #1A1214; } }
input, textarea { outline-color: ${brand.burgundy}; }
/* Narrow screens: the app fills the viewport; the showcase panel is hidden and a floating button opens the picker. */
#showcase-panel { display: none; }
/* Wide screens: phone-sized frame on a branded backdrop with the showcase panel beside it. */
@media (min-width: 900px) {
  #showcase-panel { display: flex; }
  #showcase-fab { display: none; }
  #app-frame {
    flex: 0 0 auto;
    width: 430px;
    align-self: center;
    height: min(920px, calc(100vh - 48px));
    border-radius: 44px;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.12), 0 0 0 10px rgba(0,0,0,0.35), 0 40px 80px rgba(0,0,0,0.45);
  }
}
@media (min-width: 640px) and (max-width: 899px) {
  #app-frame { flex: 0 0 auto; width: 520px; align-self: stretch; box-shadow: 0 0 0 1px rgba(0,0,0,0.35); }
}
`;
