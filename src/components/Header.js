import React from 'react';
import View from 'react-native/dist/exports/View';
import StyleSheet from 'react-native/dist/exports/StyleSheet';
import Text from 'react-native/dist/exports/Text';
import Link from './Link';
import { SHADOW, COLORS, MAX_WIDTH } from './styles';

const styles = StyleSheet.create({
  header: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: COLORS.theme,
    alignItems: 'center',
    ...SHADOW
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: MAX_WIDTH,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16
  },
  logo: {
    height: 34,
    width: 34,
    lineHeight: 30,
    borderColor: COLORS.secondary,
    borderWidth: 2,
    borderStyle: 'solid',
    color: COLORS.secondary,
    textAlign: 'center',
    flexShrink: 0,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    marginRight: 10
  },
  link: {
    fontSize: 15,
    fontWeight: '300',
    lineHeight: 56,
    letterSpacing: 1,
    color: COLORS.secondary,
    paddingLeft: 8,
    paddingRight: 8,
    opacity: 0.8
  },
  activeLink: {
    opacity: 1
  }
});

function HeaderLink({ text, href, active }) {
  return (
    <Link style={[styles.link, active && styles.activeLink]} href={href}>
      <Text>{text}</Text>
    </Link>
  );
}

export default function Header({ routes, currentRoute }) {
  return (
    <View style={styles.header}>
      <View style={styles.content}>
        <Link style={styles.logo} href="/">
          HN
        </Link>
        {routes
          .filter(({ title }) => title)
          .map(route => (
            <HeaderLink
              key={route.name}
              active={route.path === currentRoute.path}
              text={route.title}
              href={route.path}
            />
          ))}
      </View>
    </View>
  );
}
