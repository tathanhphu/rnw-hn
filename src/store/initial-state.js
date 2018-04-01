import List from '../components/List';
import Item from '../components/Item';
import User from '../components/User';
import NotFound from '../components/NotFound';
import { getCurrentRoute } from '../utils/url';
import * as apis from './apis';

export default {
  posts: {},
  routePosts: {
    news: [],
    newest: [],
    show: [],
    ask: [],
    jobs: []
  },
  users: {},
  routes: [
    {
      name: 'news',
      path: '/',
      title: 'Top',
      component: List,
      api: apis.list,
      numberOfPages: 10
    },
    {
      name: 'newest',
      path: '/new',
      title: 'New',
      component: List,
      api: apis.list,
      numberOfPages: 10
    },
    {
      name: 'show',
      path: '/show',
      title: 'Show',
      component: List,
      api: apis.list,
      numberOfPages: 1
    },
    {
      name: 'ask',
      path: '/ask',
      title: 'Ask',
      component: List,
      api: apis.list,
      numberOfPages: 2
    },
    {
      name: 'jobs',
      path: '/jobs',
      title: 'Jobs',
      component: List,
      api: apis.list,
      numberOfPages: 1
    },
    { name: 'item', path: '/item', component: Item, api: apis.item },
    { name: 'user', path: '/user', component: User, api: apis.user }
  ],
  defaultRoute: {
    component: NotFound
  },
  currentRoute: getCurrentRoute()
};
