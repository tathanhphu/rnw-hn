import React from 'react';
import View from 'react-native/dist/exports/View';
import StyleSheet from 'react-native/dist/exports/StyleSheet';
import Text from 'react-native/dist/exports/Text';
import { getHost } from '../utils/url';
import Link from './Link';
import Comment from './Comment';
import Content from './Content';
import { SHADOW, COLORS } from './styles';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    backgroundColor: COLORS.secondary,
    paddingTop: 28,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 16,
    ...SHADOW
  },
  link: {
    textDecorationLine: 'underline'
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginRight: 2,
    color: COLORS.text
  },
  subtitle: {
    color: COLORS.text
  },
  meta: {
    width: '100%',
    fontSize: 15,
    color: COLORS.textMedium,
    marginTop: 16,
    marginBottom: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline'
  },
  commentsHeader: {
    paddingTop: 16,
    fontSize: 16,
    color: COLORS.text
  },
  comments: {
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 16,
    backgroundColor: COLORS.secondary,
    ...SHADOW
  }
});

export default function Item({ currentRoute, posts }) {
  const item = posts[currentRoute.query.id[0]];
  if (!item) return null;

  const { title, url, comments_count, time_ago, user, points, comments } = item;
  const external = !url.startsWith('item');

  return (
    <Content>
      <View style={styles.header}>
        {external ? (
          <Link style={styles.title} href={url}>
            {title}
          </Link>
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
        {external && <Text style={styles.subtitle}>({getHost(url)})</Text>}
        <Text style={styles.meta}>
          {points} points | by{' '}
          <Link href={`user?id=${user}`}>
            <Text style={styles.link}>{user}</Text>
          </Link>{' '}
          {time_ago}
        </Text>
      </View>

      <View style={styles.comments}>
        <Text style={styles.commentsHeader}>{comments_count} comments</Text>
        {comments &&
          comments.map(comment => <Comment key={comment.id} {...comment} />)}
      </View>
    </Content>
  );
}
