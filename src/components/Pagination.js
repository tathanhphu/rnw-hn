import React from 'react';
import View from 'react-native/dist/exports/View';
import StyleSheet from 'react-native/dist/exports/StyleSheet';
import Text from 'react-native/dist/exports/Text';
import Link from './Link';
import { SHADOW, COLORS } from './styles';

const styles = StyleSheet.create({
  pagination: {
    position: 'fixed',
    top: 56,
    right: 0,
    left: 0,
    height: 48,
    zIndex: 1,
    backgroundColor: COLORS.secondary,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    ...SHADOW
  },
  text: {
    color: COLORS.text,
    lineHeight: 48,
    width: 48,
    fontSize: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabledLink: {
    color: COLORS.textLight
  }
});

function OptionalLink({ disabled, href, children, accessibilityLabel }) {
  return disabled ? (
    <Text
      style={[styles.text, styles.disabledLink]}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </Text>
  ) : (
    <Link
      style={styles.text}
      href={href}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </Link>
  );
}

export default function Pagination({ page, path, numberOfPages }) {
  const firstPage = page === 1;
  const lastPage = page === numberOfPages;

  return (
    <View style={styles.pagination}>
      <OptionalLink
        disabled={firstPage}
        href={`${path}?p=${page - 1}`}
        accessibilityLabel="Previous page"
      >
        <svg style={{ width: 24, height: 24, fill: 'currentColor' }}>
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </OptionalLink>
      <Text style={styles.text}>
        {page} / {numberOfPages}
      </Text>
      <OptionalLink
        disabled={lastPage}
        href={`${path}?p=${page + 1}`}
        accessibilityLabel="Next page"
      >
        <svg style={{ width: 24, height: 24, fill: 'currentColor' }}>
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </OptionalLink>
    </View>
  );
}
