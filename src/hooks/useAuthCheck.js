/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// hooks
import useMessage from './useMessege';
import useLoginUser from './useLoginUser';
import useLoginCheck from './useLoginCheck';
// url
import { LoggedinUrl } from '../urls/index';

// ログインしているかチェック＆ログインのUserを取得する関数
const useAuthCheck = () => {
  const { setLoginUser } = useLoginUser();
  const { setLoginState } = useLoginCheck();
  const history = useHistory();
  const { showMessage } = useMessage();

  // const CheckAuth = useCallback(async () => {
  //   await axios
  const CheckAuth = useCallback(() => {
    axios
      .get(LoggedinUrl, { withCredentials: true })
      .then((response) => {
        if (response.data.status === 200) {
          setLoginUser(response.data);
          setLoginState(true);
        }
        // 認証できなかった時のエラー
        else if (response.data.status === 401) {
          setLoginUser(null);
          setLoginState(false);
          showMessage({ title: `${response.data.errors}`, status: 'error' });
          history.push('/login');
        }
        // うまくgetできなかった時のエラー
      })
      .catch(() => {
        showMessage({ title: '認証が確認できません、再度ログインし直してください', status: 'error' });
        setLoginUser(null);
        setLoginState(false);
        history.push('/login');
      });
  }, [history, showMessage, setLoginUser]);
  return { CheckAuth };
};
export default useAuthCheck;
