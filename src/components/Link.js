import React from 'react';
import Text from 'react-native/dist/exports/Text';
import { isCurrentOrigin } from '../utils/url';

function onPress({ event, href }) {
  if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) return;
  if (!isCurrentOrigin(href)) return;

  event.preventDefault();

  window.history.pushState(null, null, href);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export default function Link({ style, href, children, accessibilityLabel }) {
  return (
    <Text
      style={style}
      accessibilityRole="link"
      accessibilityLabel={accessibilityLabel}
      href={href}
      onPress={event => onPress({ event, href })}
    >
      {children}
    </Text>
  );
}
