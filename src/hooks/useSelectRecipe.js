import { useCallback, useState } from 'react';

import useMessage from './useMessege';

// 選択したレシピ情報を特定しモーダルを表示するカスタムフック
const useSelectRecipe = () => {
  const { showMessage } = useMessage();

  const [selectedRecipe, setSelectedRecipe] = useState();

  const onSelectRecipe = useCallback(
    (props) => {
      const { id, recipes, onOpen } = props;
      const targetRecipe = recipes.find((recipe) => recipe.id === id);
      // findは条件に一致する最初の要素を返す
      // recipeのidと選択したidが一致したものを返す
      if (!targetRecipe) {
        showMessage({ title: 'レシピが見つかりません', status: 'error' });
      } else {
        setSelectedRecipe(targetRecipe);
        onOpen();
      }
    },
    [showMessage]
  );

  return { onSelectRecipe, selectedRecipe };
};

export default useSelectRecipe;
