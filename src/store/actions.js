import keyBy from 'lodash-es/keyBy';

const BASE_PATH = 'https://api.hnpwa.com/v0';

async function get(...parts) {
  const res = await window.fetch(`${BASE_PATH}/${parts.join('/')}.json`);

  if (!res.ok) return Promise.reject(res.text());
  return res.json();
}

export async function fetchItems(type, page) {
  const items = await get(type, page);
  const ids = items.map(({ id }) => id);
  const posts = keyBy(items, 'id');

  return {
    posts,
    routePosts: { type, ids, page }
  };
}

export async function fetchItem(type, id) {
  const item = await get(type, id);

  return { [item.id]: item };
}
