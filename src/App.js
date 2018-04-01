import React from 'react';
import Main from './components/Main';
import initialState from './store/initial-state';
import { getCurrentRoute } from './utils/url';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.updateData();
  }

  onPopstate = () => {
    this.setState({ currentRoute: getCurrentRoute() }, () => {
      this.updateData();
    });
  };

  async updateData() {
    try {
      const activeRoute = this.state.routes.find(
        ({ path }) => path === this.state.currentRoute.path
      );
      if (!activeRoute) return;

      this.setState(await activeRoute.api(this.state, activeRoute));
    } catch (error) {
      console.error('Failed to update', error);
    }
  }

  componentDidMount() {
    window.addEventListener('popstate', this.onPopstate);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onPopstate);
  }

  render() {
    return <Main {...this.state} />;
  }
}
