import React, { memo } from 'react';
import { Button } from '@chakra-ui/react';

const PrimaryBtn = memo((props) => {
  const { children, isFullWidth = false, disabled = false, isLoading, onClick } = props;

  return (
    <Button
      bg="green.300"
      color="white"
      isFullWidth={isFullWidth}
      disabled={disabled || isLoading}
      isLoading={isLoading}
      _hover={{ opacity: 0.8 }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});

export default PrimaryBtn;
