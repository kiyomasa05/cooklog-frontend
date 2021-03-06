import React, { createContext, useState } from 'react';

// const initial_user = {
//   user: {
//     name: 'notExist',
//     id: 1,
//     email: 'sample@sample.com',
//   },
//   logged_in: false,
// };
// loginUserはUser（配列）かnull=false
export const LoginUserContext = createContext({});

// ログインユーザー情報を保持するcontext
export function LoginUserProvider(props) {
  const { children } = props;
  const [loginUser, setLoginUser] = useState(null);
  // const [loginUser, setLoginUser] = useState(initial_user);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>{children}</LoginUserContext.Provider>;
}
// loginUserの値が変わった場合、loginUserを使用しているコンポーネントは全て再レンダリングされるので注意
