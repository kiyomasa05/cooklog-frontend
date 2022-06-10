import { useCallback, useState } from 'react';
import axios from 'axios';

import { getFavoURL } from '../urls/index';
import useMessage from './useMessege';

const useGetFavo = () => {
  const { showMessage } = useMessage();
  const [Favoloading, setFavoLoading] = useState(false);
  const [FavoRecipes, setFavoRecipes] = useState([]);

  const getFavoRecipe = useCallback(
    (loginUserId) => {
      setFavoLoading(true);
      axios
        .get(getFavoURL(loginUserId), { withCredentials: true })
        .then((response) => {
          setFavoRecipes(response.data);
        })
        .catch(() => {
          showMessage({ title: 'お気に入りレシピ取得に失敗しました', status: 'error' });
          setFavoLoading(false);
        })
        .finally(() => {
          setFavoLoading(false);
        });
    },
    [showMessage]
  );

  return { getFavoRecipe, Favoloading, FavoRecipes };
};
export default useGetFavo;
