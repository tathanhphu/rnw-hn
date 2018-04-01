import React from 'react';
import View from 'react-native/dist/exports/View';
import StyleSheet from 'react-native/dist/exports/StyleSheet';
import Text from 'react-native/dist/exports/Text';
import TouchableOpacity from 'react-native/dist/exports/TouchableOpacity';
import Link from './Link';
import HTMLContent from './HTMLContent';
import { COLORS } from './styles';

const styles = StyleSheet.create({
  comment: {
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor
  },
  header: {
    flexDirection: 'row',
    marginTop: 14
  },
  user: {
    textDecorationLine: 'underline'
  },
  headerText: {
    fontSize: 13,
    color: COLORS.textMedium
  },
  text: {
    marginTop: 6,
    marginBottom: 6
  },
  comments: {
    paddingLeft: 22
  }
});

export default class Comment extends React.PureComponent {
  state = {
    hidden: false
  };

  render() {
    const { user, time_ago, content, comments } = this.props;

    return (
      <View style={styles.comment}>
        <View style={styles.header}>
          <Link
            style={[styles.headerText, styles.user]}
            href={`user?id=${user}`}
          >
            {user}
          </Link>
          <Text style={styles.headerText}> {time_ago} </Text>
          <TouchableOpacity
            onPress={() => this.setState({ hidden: !this.state.hidden })}
            activeOpacity={1}
          >
            <Text style={styles.headerText}>
              {this.state.hidden ? '[+]' : '[-]'}
            </Text>
          </TouchableOpacity>
        </View>
        {!this.state.hidden && (
          <View style={styles.text}>
            <HTMLContent value={content} />
          </View>
        )}
        {!this.state.hidden && (
          <View style={styles.comments}>
            {comments.map((comment, index) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </View>
        )}
      </View>
    );
  }
}
