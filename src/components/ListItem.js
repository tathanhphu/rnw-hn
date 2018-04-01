import React from 'react';
import View from 'react-native/dist/exports/View';
import StyleSheet from 'react-native/dist/exports/StyleSheet';
import Text from 'react-native/dist/exports/Text';
import Link from './Link';
import { getHost } from '../utils/url';
import { COLORS } from './styles';

const styles = StyleSheet.create({
  item: {
    paddingTop: 20,
    paddingRight: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    flexShrink: 1
  },
  score: {
    flexShrink: 0,
    width: 80,
    textAlign: 'center',
    color: COLORS.theme,
    fontSize: 17,
    fontWeight: '700'
  },
  row: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 2,
    flexWrap: 'wrap',
    alignItems: 'baseline'
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    color: COLORS.text,
    marginRight: 2
  },
  small: {
    fontSize: 13,
    color: COLORS.textMedium
  },
  link: {
    textDecorationLine: 'underline'
  }
});

export default function ListItem({
  points,
  title,
  url,
  comments_count,
  time_ago,
  user,
  id,
  type
}) {
  const external = !url.startsWith('item');

  return (
    <View style={styles.item}>
      <Text style={styles.score}>{points || 1}</Text>
      <View style={styles.content}>
        <View style={styles.row}>
          <Link style={styles.title} href={url}>
            <Text>{title}</Text>
          </Link>
          {external && <Text style={styles.small}>({getHost(url)})</Text>}
        </View>
        <View style={styles.row}>
          <Text style={styles.small}>
            {user && 'by '}
            {user && (
              <Link href={`user?id=${user}`}>
                <Text style={styles.link}>{user}</Text>
              </Link>
            )}
            {user && ' '}
            {time_ago}
            {type !== 'job' && ' | '}
            {type !== 'job' && (
              <Link href={`item?id=${id}`}>
                <Text style={styles.link}>
                  {comments_count} comment{comments_count !== 1 && 's'}
                </Text>
              </Link>
            )}
          </Text>
        </View>
      </View>
    </View>
  );
}
