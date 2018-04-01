import React from 'react';
import View from 'react-native/dist/exports/View';
import StyleSheet from 'react-native/dist/exports/StyleSheet';
import Text from 'react-native/dist/exports/Text';
import HTMLContent from './HTMLContent';
import Content from './Content';
import { SHADOW, COLORS } from './styles';

const styles = StyleSheet.create({
  user: {
    backgroundColor: COLORS.secondary,
    paddingTop: 30,
    paddingRight: 45,
    paddingLeft: 45,
    paddingBottom: 30,
    ...SHADOW
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text
  },
  meta: {
    marginTop: 15
  },
  metaText: {
    fontSize: 15,
    color: COLORS.text
  }
});

export default function User({ users, currentRoute }) {
  const user = users[currentRoute.query.id[0]];
  if (!user) return null;

  return (
    <Content>
      <View style={styles.user}>
        <Text style={styles.title}>User: {user.id}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>Created: {user.created}</Text>
          <Text style={styles.metaText}>Karma: {user.karma}</Text>
        </View>
        <View style={styles.meta}>
          {user.about && <HTMLContent value={user.about} />}
        </View>
      </View>
    </Content>
  );
}
