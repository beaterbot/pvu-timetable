import React from 'react';
import {
  Redirect, Route, Switch,
} from 'react-router-dom';
import MainLayout from '@layout/MainLayout';
import Home from '@pages/Home';
import { useAuthStore } from '@store/authStore';

const MainRouter = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated
    ? (
      <MainLayout>
        <Switch>
          <Route path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      </MainLayout>
    )
    : (
      <Redirect to="/auth/login" />
    );
};

export default MainRouter;
