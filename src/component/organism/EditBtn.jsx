import React, { memo, useCallback } from 'react';
import { Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

import { useHistory } from 'react-router-dom';

// editのonoffのみ役割
const RecipeEditBtn = memo((props) => {
  const { recipes, children } = props;
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

  return (
    <Button
      leftIcon={<EditIcon color="black" />}
      colorScheme="gray"
      color="black"
      mr={3}
      onClick={onClickRecipeEdit}
      recipe={recipes}
    >
      {children}
    </Button>
  );
});

export default RecipeEditBtn;
