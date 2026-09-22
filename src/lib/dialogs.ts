import { Alert, Platform, Share } from 'react-native';

/**
 * Cross-platform dialogs. react-native-web ships `Alert.alert` as a no-op and
 * `Share.share` that rejects when the browser has no Web Share API, so these
 * wrappers fall back to the browser's own dialogs and the clipboard on web.
 */

type Button = { text: string; style?: 'default' | 'cancel' | 'destructive'; onPress?: () => void };

export function notice(title: string, message?: string) {
  if (Platform.OS === 'web') {
    window.alert(message ? `${title}\n\n${message}` : title);
    return;
  }
  Alert.alert(title, message);
}

/** Two-button confirm. Resolves true when the non-cancel button is pressed. */
export function confirm(title: string, message: string, buttons: [Button, Button]) {
  if (Platform.OS === 'web') {
    const ok = window.confirm(`${title}\n\n${message}`);
    const chosen = buttons.find((b) => (ok ? b.style !== 'cancel' : b.style === 'cancel'));
    chosen?.onPress?.();
    return;
  }
  Alert.alert(title, message, buttons);
}

export async function share(message: string, url?: string) {
  if (Platform.OS === 'web') {
    const nav = typeof navigator !== 'undefined' ? navigator : undefined;
    if (nav?.share) {
      try {
        await nav.share({ text: message, url });
        return;
      } catch {
        // User dismissed the sheet or the browser refused; fall through to copy.
      }
    }
    try {
      await nav?.clipboard?.writeText(url ? `${message} ${url}` : message);
      window.alert('Copied to clipboard.');
    } catch {
      window.alert(message);
    }
    return;
  }
  await Share.share({ message, url }).catch(() => undefined);
}
