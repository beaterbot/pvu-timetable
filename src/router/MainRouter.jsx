import React from 'react';
import {
  Redirect, Route, Switch,
} from 'react-router-dom';
import MainLayout from '@layout/MainLayout';
import Home from '@pages/Home';

const MainRouter = () => {
  return (
    <MainLayout>
      <Switch>
        <Route path="/home" component={Home} />
        <Redirect to="/home" />
      </Switch>
    </MainLayout>
  )
};

export default MainRouter;
