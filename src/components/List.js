import React from 'react';
import View from 'react-native/dist/exports/View';
import StyleSheet from 'react-native/dist/exports/StyleSheet';
import Pagination from './Pagination';
import Content from './Content';
import ListItem from './ListItem';
import { SHADOW, COLORS } from './styles';

const LIST_LENGTH = 30;

const styles = StyleSheet.create({
  main: {
    zIndex: 1,
    flexShrink: 1
  },
  list: {
    marginTop: 56,
    backgroundColor: COLORS.secondary,
    ...SHADOW
  }
});

export default function List({ routePosts, posts, activeRoute, currentRoute }) {
  const page =
    (currentRoute.query.p && parseInt(currentRoute.query.p[0], 10)) || 1;

  const items = routePosts[activeRoute.name]
    .slice((page - 1) * LIST_LENGTH, page * LIST_LENGTH)
    .map(id => posts[id]);

  return (
    <View style={styles.main} accessibilityRole="main">
      <Pagination
        page={page}
        path={currentRoute.path}
        numberOfPages={activeRoute.numberOfPages}
      />
      <Content>
        <View style={styles.list}>
          {items.map(item => <ListItem key={item.id} {...item} />)}
        </View>
      </Content>
    </View>
  );
}
