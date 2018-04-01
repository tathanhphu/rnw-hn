import React from 'react';
import View from 'react-native/dist/exports/View';
import StyleSheet from 'react-native/dist/exports/StyleSheet';
import Header from './Header';
import { COLORS } from './styles';

const styles = StyleSheet.create({
  app: {
    flex: 1,
    paddingTop: 56,
    backgroundColor: COLORS.background
  }
});

export default function Main(state) {
  const activeRoute =
    state.routes.find(({ path }) => path === state.currentRoute.path) ||
    state.defaultRoute;

  return (
    <View style={styles.app}>
      <Header {...state} />
      <activeRoute.component {...state} activeRoute={activeRoute} />
    </View>
  );
}
