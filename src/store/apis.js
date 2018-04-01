import { fetchItem, fetchItems } from './actions';
import * as reducers from './reducers';

export async function item(state) {
  const [id] = state.currentRoute.query.id;
  const posts = await fetchItem('item', id);

  return newState => ({
    posts: reducers.posts(newState.posts, posts)
  });
}

export async function user(state) {
  const [id] = state.currentRoute.query.id;
  const users = await fetchItem('user', id);

  return newState => ({
    users: reducers.users(newState.users, users)
  });
}

export async function list(state, activeRoute) {
  const { query } = state.currentRoute;
  const page = (query.p && parseInt(query.p[0], 10)) || 1;
  const { posts, routePosts } = await fetchItems(activeRoute.name, page);

  return newState => ({
    posts: reducers.posts(newState.posts, posts),
    routePosts: reducers.routePosts(newState.routePosts, routePosts)
  });
}
