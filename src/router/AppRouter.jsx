import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';

import MainRouter from './MainRouter';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={MainRouter} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
