import React, { memo } from 'react';
import { IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const MenuIconButton = memo((props) => {
  const { onOpen, btnRef } = props;
  return (
    <IconButton
      icon={<HamburgerIcon />}
      size="md"
      variant="unstyled"
      display={{ base: 'block', md: 'none' }}
      onClick={onOpen}
      ref={btnRef}
    />
  );
});

export default MenuIconButton;
