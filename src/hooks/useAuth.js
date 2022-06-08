/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import useMessage from './useMessege';
import useLoginUser from './useLoginUser';
import useLoginCheck from './useLoginCheck';

import { loginUrl } from '../urls/index';

function useAuth() {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();
  const { setLoginState } = useLoginCheck();

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (data) => {
      setLoading(true);
      // ローディングアイコンをtrueに
      axios
        .post(
          loginUrl,
          {
            user: {
              email: data.email,
              password: data.password,
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.status === 200) {
            setLoginUser(response.data);
            setLoginState(true);
            showMessage({ title: 'ログインしました', status: 'success' });
            const user_id = response.data.user.id;
            history.push(`/users/${user_id}`);
          }
          // 認証できなかった時のエラー
          else if (response.data.status === 401) {
            showMessage({ title: `${response.data.errors}`, status: 'error' });
          }
          // うまくpostできなかった時のエラー
        })
        .catch(() => {
          showMessage({ title: '認証できませんでした。再度リロードなどを行いやり直して下さい', status: 'error' });
          setLoading(false);
        });
    },
    [history, showMessage, setLoginUser]
  );

  return { login, loading };
}

export default useAuth;
