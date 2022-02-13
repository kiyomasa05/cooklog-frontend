import React, { memo } from 'react';
import { Box } from '@chakra-ui/react';

const ErrorMessage = memo((props) => {
  const { children } = props;
  return (
    <Box w="auto" p="-0.5" mx="0" color="red" fontSize="md">
      {children}
    </Box>
  );
});

export default ErrorMessage;
