/* eslint-disable */
import { useCallback, useState } from 'react';
import axios from 'axios';

// 部品
import useMessage from './useMessege';

// url
import { favoURL, setFavoURL } from '../urls/index';

const useFavo = () => {
  const { showMessage } = useMessage();
  const [favorite, setFavorite] = useState(false);

  const initialFavoState = useCallback((recipe_id) => {
    // recipeのidが取得できたら通信するように条件分岐
    if (recipe_id !== undefined) {
      axios
        .get(setFavoURL(recipe_id), { withCredentials: true })
        .then((response) => {
          setFavorite(response.data); // favoriteのtrueかfalseが入る
        })
        .catch((e) => {
          showMessage({ title: `${e}`, status: 'error' });
          console.log(e);
        });
    }
  }, [showMessage]);

  const callFavorite = useCallback(
    (recipe_id, loginUserId) => {
      axios
        .post(
          favoURL(recipe_id),
          {
            data: {
              user_id: loginUserId, 
              recipe_id,
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.status === 'created') {
            showMessage({ title: 'お気に入り登録しました', status: 'success' });
            setFavorite(true);
          }
          // 認証できなかった時のエラー
          else if (response.data.status === 500) {
            showMessage({ title: 'お気に入り登録できませんでした', status: 'error' });
          }
          // うまくpostできなかった時のエラー
        })
        .catch((e) => {
          showMessage({ title: 'お気に入り登録できませんでした。', status: 'error' });
        });
    },
    [showMessage]
  );

  const deleteFavorite = useCallback(
    (recipe_id, loginUserId) => {
      axios
        .delete(
          favoURL(recipe_id),
          {
            data: {
              user_id: loginUserId,
              recipe_id,
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.status === 'delete') {
            showMessage({ title: 'お気に入り解除しました', status: 'success' });
            setFavorite(false);
          }
          // 認証できなかった時のエラー
          else if (response.data.status === 500) {
            showMessage({ title: `${response.data.errors}`, status: 'error' });
          }
          // うまくpostできなかった時のエラー
        })
        .catch((e) => {
          showMessage({ title: 'お気に入り解除できませんでした。', status: 'error' });
        });
    },
    [showMessage]
  );

  return {
    callFavorite,
    deleteFavorite,
    initialFavoState,
    favorite,
  };
};

export default useFavo;
