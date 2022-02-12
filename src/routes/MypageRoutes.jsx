import React from 'react';
import { Mypage } from '../component/pages/Mypage';
import Page404 from '../component/pages/404';
import UserEdit from '../component/pages/UserEdit';
import Post from '../component/pages/Post';

const MypageRoutes = [
  // users/
  {
    path: '/:id',
    exact: true,
    children: <Mypage />,
  },
  {
    path: '/:id/edit',
    exact: false,
    children: <UserEdit />,
  },
  {
    path: '/:id/post',
    exact: false,
    children: <Post />,
  },
  {
    path: '*',
    exact: false,
    children: <Page404 />,
  },
];

export default MypageRoutes;
