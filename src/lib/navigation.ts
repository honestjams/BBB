import { router, type Href } from 'expo-router';

/**
 * Close a screen. On web, a deep link straight to /special/x or /card has no
 * history, so `router.back()` would do nothing; go to the fallback instead.
 */
export function goBack(fallback: Href = '/') {
  if (router.canGoBack()) router.back();
  else router.replace(fallback);
}
