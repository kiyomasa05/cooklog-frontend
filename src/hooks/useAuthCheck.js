/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
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

  const [UserLoading, setUserLoading] = useState(false);
  const CheckAuth = useCallback(() => {
    setUserLoading(true);
    // ユーザー情報を取るまでロード中にする（他コンポーネントでコンパイルエラーが起きないようにするため）
    axios
      .get(LoggedinUrl, { withCredentials: true })
      .then((response) => {
        if (response.data.status === 200) {
          setLoginUser(response.data);
          setLoginState(true);
          setUserLoading(false);
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
        setUserLoading(false);
        history.push('/login');
      })
      .finally(() => {
        setUserLoading(false);
      });
  }, [history, showMessage, setLoginUser]);
  return { CheckAuth, UserLoading };
};
export default useAuthCheck;
