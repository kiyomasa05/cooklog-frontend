import React from 'react';
import Home from '../component/pages/static_page';
import Login from '../component/pages/Login';
import Signup from '../component/pages/Signup';
import Index from '../component/pages/Index';
import Search from '../component/pages/Search';
import RecipeEdit from '../component/pages/RecipeEdit';

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
];

export default HomeRoutes;
