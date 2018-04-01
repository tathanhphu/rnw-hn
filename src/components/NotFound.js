import React from 'react';
import View from 'react-native/dist/exports/View';
import StyleSheet from 'react-native/dist/exports/StyleSheet';
import Text from 'react-native/dist/exports/Text';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22
  }
});

export default function NotFound() {
  return (
    <View style={styles.main} accessibilityRole="main">
      <Text style={styles.text}>404 - Not found</Text>
    </View>
  );
}
