import React, { memo, useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { Flex, Text, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const Page404 = memo(() => {
  const history = useHistory();
  const onClickHome = useCallback(() => history.push('/'), [history]);
  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Text fontSize="6xl">404 not Found </Text>
      <Button ml={10} rightIcon={<ArrowForwardIcon />} colorScheme="teal" variant="outline" onClick={onClickHome}>
        Topへ戻る
      </Button>
    </Flex>
  );
});

export default Page404;
