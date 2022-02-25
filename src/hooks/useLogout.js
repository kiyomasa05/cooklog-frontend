/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import useMessage from './useMessege';
import useLoginUser from './useLoginUser';
import useLoginCheck from './useLoginCheck';

import { logoutURL } from '../urls/index';

const useLogout = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();
  const { setLoginState } = useLoginCheck();

  const logout = useCallback(() => {
    axios
      .delete(logoutURL, { withCredentials: true })
      .then(() => {
        setLoginUser(null);
        setLoginState(false);
        showMessage({ title: 'ログアウトしました', status: 'success' });
        history.push('/login');
      })
      .catch(() => {
        showMessage({ title: 'ログアウトできませんでした。再度ボタンを押してください', status: 'error' });
      });
  }, [history, showMessage, setLoginUser]);

  return { logout };
};
export default useLogout;
