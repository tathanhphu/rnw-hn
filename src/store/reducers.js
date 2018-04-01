import transform from 'lodash-es/transform';

export function posts(posts, newPosts) {
  // Keep comments and comments_count if available
  return transform(
    newPosts,
    (obj, value, key) => {
      const comments = value.comments || (obj[key] && obj[key].comments);
      const comments_count =
        value.comments || !obj[key]
          ? value.comments_count
          : obj[key].comments_count;

      obj[key] = { ...value, comments, comments_count };
    },
    { ...posts }
  );
}

export function routePosts(state, { type, ids, page }) {
  // Add ids to correct position in array
  const newIds = new Array(ids.length * page);
  newIds.splice(ids.length * (page - 1), ...ids);

  return {
    ...state,
    [type]: Object.assign([], state[type], newIds)
  };
}

export function users(users, newUsers) {
  return { ...users, ...newUsers };
}
