import React from 'react';
import View from 'react-native/dist/exports/View';
import StyleSheet from 'react-native/dist/exports/StyleSheet';
import { MAX_WIDTH } from './styles';

const styles = StyleSheet.create({
  mainContent: {
    paddingBottom: 8,
    alignItems: 'center'
  },
  content: {
    maxWidth: MAX_WIDTH,
    width: '100%'
  }
});

export default function Content({ children }) {
  return (
    <View style={styles.mainContent} accessibilityRole="main">
      <View style={styles.content}>{children}</View>
    </View>
  );
}
