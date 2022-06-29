import React, { memo, useCallback } from 'react';
import { Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

import { useHistory } from 'react-router-dom';
// import useGetClickedRecipe from '../../hooks/useGetClickedRecipe';

// editのonoffのみ役割
const RecipeEditBtn = memo((props) => {
  const { recipes, children } = props;
  // const { GetClickedRecipe, EditRecipe, loading } = useGetClickedRecipe;
  const history = useHistory();

  const recipeId = recipes?.id;

  const onClickRecipeEdit = useCallback(
    () =>
      history.push({
        pathname: `/${recipeId}/edit`,
        state: recipes,
      }),
    [history, recipeId, recipes]
  );
  // const RecipeId = recipes.id;
  // const onClickRecipeEdit = () => {
  //   GetClickedRecipe(RecipeId);
  // };
  // const onClickRecipeEdit = useCallback(() => history.push(`/users/${id}/edit`), [history]);

  return (
    <Button
      leftIcon={<EditIcon color="black" />}
      colorScheme="gray"
      color="black"
      mr={3}
      // loading={loading}
      onClick={onClickRecipeEdit}
      recipe={recipes}
    >
      {children}
    </Button>
  );
});

export default RecipeEditBtn;
