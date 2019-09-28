// react libraries
import * as React from 'react';

// third party packages
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// components
import UsernamePage from '../pages/UsernamePage/index';
import App from '../App/App';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/username" component={UsernamePage} />
    </Switch>
  </Router>
);

export default Routes;
