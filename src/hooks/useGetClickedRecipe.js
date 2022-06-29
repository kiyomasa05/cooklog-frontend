/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
// hooks
import useMessage from './useMessege';
// import useLoginUser from './useLoginUser';
// import useLoginCheck from './useLoginCheck';
// url
import { recipeEditURL } from '../urls/index';

function useGetClickedRecipe() {
  const history = useHistory();
  const { showMessage } = useMessage();
  // const { setLoginUser } = useLoginUser();
  // const { setLoginState } = useLoginCheck();

  const [EditRecipe, setEditRecipe] = useState();
  const [loading, setLoading] = useState(false);

  const GetClickedRecipe = useCallback(
    (id) => {
      setLoading(true);
      axios
        .get(recipeEditURL(id), { withCredentials: true })
        .then((response) => {
          setEditRecipe(response.data);
          const recipe_id = response.data.recipe.id;
          history.push(`/${recipe_id}/edit`);
          // うまくpostできなかった時のエラー
        })
        .catch(() => {
          showMessage({ title: 'レシピを取得できませんでした', status: 'error' });
          setLoading(false);
        });
    },
    [history, showMessage]
  );

  return { GetClickedRecipe, EditRecipe, loading };
}

export default useGetClickedRecipe;
