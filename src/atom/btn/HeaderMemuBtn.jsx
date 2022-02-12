import React, { memo } from 'react';
import { Button } from '@chakra-ui/react';

const HeaderMenuBtn = memo((props) => {
  const { children } = props;
  return (
    <Button mr={4} variant="ghost" colorScheme="linkedin" color="black">
      {children}
    </Button>
  );
});

export default HeaderMenuBtn;
