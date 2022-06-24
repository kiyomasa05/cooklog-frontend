import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../component/organism/Header/Header';
import Page404 from '../component/pages/404';
import HomeRoutes from './HomeRoutes';
import MypageRoutes from './MypageRoutes';
import { LoginUserProvider } from '../hooks/providers/LoginUserProvider';
import { LoginCheckProvider } from '../hooks/providers/LoginCheckProvider';

export default function Router() {
  return (
    <Switch>
      {/* ログイン認証が使えるように */}
      <LoginUserProvider>
        <LoginCheckProvider>
          {/* 未ログインのルート */}
          <Route
            path="/"
            render={() => (
              <Switch>
                {HomeRoutes.map((route) => (
                  <Route key={route.path} exact={route.exact} path={route.path}>
                    <Header>{route.children}</Header>
                  </Route>
                ))}
                <Route path="*">
                  <Page404 />
                </Route>
              </Switch>
            )}
          />
          {/* マイページのルート */}
          <Route
            path="/users"
            render={({ match: { url } }) => (
              <Switch>
                {MypageRoutes.map((route) => (
                  <Route key={route.path} exact={route.exact} path={`${url}${route.path}`}>
                    <Header>{route.children}</Header>
                  </Route>
                ))}
                <Route path="*">
                  <Page404 />
                </Route>
              </Switch>
            )}
          />
        </LoginCheckProvider>
      </LoginUserProvider>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
}
