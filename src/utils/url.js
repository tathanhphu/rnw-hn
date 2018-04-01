import mapValues from 'lodash-es/mapValues';
import uniq from 'lodash-es/uniq';
import keyBy from 'lodash-es/keyBy';

export function isCurrentOrigin(url) {
  try {
    return new URL(url).origin === window.location.origin;
  } catch (_) {
    return true;
  }
}

export function getHost(url) {
  try {
    return new URL(url).host;
  } catch (_) {
    return '';
  }
}

/**
 * Return an object of arrays with query parameters from a URL
 */
export function getQuery(search) {
  const query = new URLSearchParams(search);

  return mapValues(keyBy(uniq(Array.from(query.keys()))), name =>
    query.getAll(name)
  );
}

export function getCurrentRoute() {
  return {
    path: window.location.pathname,
    query: getQuery(window.location.search),
    pathname: window.location.pathname + window.location.search
  };
}
