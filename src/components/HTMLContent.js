import React from 'react';
import View from 'react-native/dist/exports/View';
import StyleSheet from 'react-native/dist/exports/StyleSheet';
import Text from 'react-native/dist/exports/Text';
import parseHTML from '../utils/html-parser';
import { COLORS } from './styles';

const styles = StyleSheet.create({
  block: {
    maxWidth: '100%',
    marginTop: 8
  },
  link: {
    textDecorationLine: 'underline'
  },
  text: {
    fontSize: 15,
    color: COLORS.text
  },
  pre: {
    marginTop: 8,
    marginBottom: 8,
    fontFamily: 'monospace',
    overflow: 'auto'
  },
  italic: {
    fontStyle: 'italic'
  }
});

function createEl({ tag, attributes, key, children }) {
  switch (tag) {
    case 'a':
      const href = attributes.find(({ name }) => name === 'href');
      return (
        <Text
          key={key}
          accessibilityRole="link"
          href={href.value}
          style={[styles.link, styles.text]}
        >
          {children}
        </Text>
      );
    case 'pre':
      return (
        <Text key={key} style={[styles.pre, styles.text]}>
          {children}
        </Text>
      );
    case 'i':
      return (
        <Text key={key} style={[styles.italic, styles.text]}>
          {children}
        </Text>
      );
    default:
      return (
        <Text key={key} style={styles.block}>
          {children}
        </Text>
      );
  }
}

function astToReact(ast) {
  return ast.map((el, index) => {
    if (typeof el === 'string') {
      return (
        <Text key={index} style={styles.text}>
          {el}
        </Text>
      );
    } else {
      return createEl({
        tag: el.tag,
        attributes: el.attributes,
        key: index,
        children: astToReact(el.children)
      });
    }
  });
}

export default function HTMLContent({ value }) {
  return <View style={styles.block}>{astToReact(parseHTML(value))}</View>;
}
