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

const useAuthCheck = () => {
  const { setLoginUser } = useLoginUser();
  const { setLoginState } = useLoginCheck();
  const history = useHistory();
  const { showMessage } = useMessage();

  const CheckAuth = useCallback(() => {
    axios
      .get(LoggedinUrl, { withCredentials: true })
      .then((response) => {
        if (response.data === true) {
          setLoginState(true);
        }
        // 認証できなかった時のエラー
        else if (response.data === false) {
          setLoginUser(null);
          setLoginState(false);
          showMessage({ title: `${response.data.errors}`, status: 'error' });
          history.push('/login');
        }
        // うまくgetできなかった時のエラー
      })
      .catch((e) => {
        showMessage({ title: '認証が確認できません', status: 'error' });
        // eslint-disable-next-line no-console
        console.log(e);
        history.push('/login');
      });
  }, [history, showMessage, setLoginUser]);
  return { CheckAuth };
};

export default useAuthCheck;
