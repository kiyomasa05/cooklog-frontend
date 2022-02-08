/* eslint-disable */
import React, { memo, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

import useFavo from '../hooks/useFavo';

// お気に入りのonoffのみ役割
const FavoBtn = memo((props) => {
  const { recipes, loginUser } = props;

  const { callFavorite, deleteFavorite, initialFavoState, favorite } = useFavo();

  useEffect(() => {
    initialFavoState(recipes?.id);
  }, [recipes, initialFavoState]);

  const onClickFavo = () => {
    callFavorite(recipes.id, loginUser.user.id);
  };
  // お気に入り解除機能
  const onClickFavosol = () => {
    deleteFavorite(recipes.id, loginUser.user.id);
  };

  return (
    <>
      {favorite ? (
        <Button leftIcon={<StarIcon />} colorScheme="yellow" mr={3} onClick={onClickFavosol}>
          お気に入り登録済
        </Button>
      ) : (
        <Button leftIcon={<StarIcon color="white" />} colorScheme="blue" color="white" mr={3} onClick={onClickFavo}>
          お気に入り登録
        </Button>
      )}
    </>
  );
});

export default FavoBtn;
