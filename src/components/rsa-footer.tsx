import { StyleSheet, View } from 'react-native';

import { Text } from './text';

import { space } from '@/theme';

/** Required Liquor Act notice. Same wording as the website footer. */
export function RsaFooter() {
  return (
    <View style={styles.wrap}>
      <Text variant="caption" color="muted" style={styles.text}>
        We take the Responsible Service of Alcohol seriously. Liquor Act 2007: it is against the law to sell or
        supply liquor to, or to obtain on behalf of, a person under the age of 18 years.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: space.xl, paddingVertical: space.xl },
  text: { textAlign: 'center', fontSize: 12, lineHeight: 17 },
});
