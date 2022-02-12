import React from 'react';
import Home from '../component/pages/static_page';
import Login from '../component/pages/Login';
import Signup from '../component/pages/Signup';
import Index from '../component/pages/Index';
import Search from '../component/pages/Search';
import RecipeEdit from '../component/pages/RecipeEdit';
// import { Page404 } from '../containers/404';

const HomeRoutes = [
  {
    path: '/',
    exact: true,
    children: <Home />,
  },
  {
    path: '/login',
    exact: false,
    children: <Login />,
  },
  {
    path: '/signup',
    exact: false,
    children: <Signup />,
  },
  {
    path: '/index',
    exact: false,
    children: <Index />,
  },
  {
    path: '/search',
    exact: false,
    children: <Search />,
  },
  {
    path: '/:id/edit',
    exact: false,
    children: <RecipeEdit />,
  },
  // 出すと404ページが他のページと被ってしまう
  // {
  //   path: '/*',
  //   exact: false,
  //   children: <Page404 />
  // }
];

export default HomeRoutes;
