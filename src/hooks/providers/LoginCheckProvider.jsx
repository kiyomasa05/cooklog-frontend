import React, { createContext, useState } from 'react';

export const LoginCheckContext = createContext({});

// ログインのbluuleanを制御するコンテキスト
export function LoginCheckProvider(props) {
  const { children } = props;
  const [LoginState, setLoginState] = useState(false);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <LoginCheckContext.Provider value={{ LoginState, setLoginState }}>{children}</LoginCheckContext.Provider>;
}
