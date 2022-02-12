import React, { memo } from 'react';
import { Button } from '@chakra-ui/react';

const MenuDrawerBtn = memo((props) => {
  const { children, onClose, onClick } = props;
  return (
    <Button
      width="100%"
      mb="4"
      borderBottom="1px"
      borderStyle="solid"
      borderColor="gray"
      borderRight="none"
      borderLeft="none"
      borderTop="none"
      color="#4b4f56"
      borderBottomWidth="80%"
      colorScheme="whiteAlpha"
      borderRadius="none"
      onClick={onClick}
      onClose={onClose}
    >
      {children}
    </Button>
  );
});

export default MenuDrawerBtn;
