/* eslint-disable */
import React, { memo } from 'react';
import { Box, Divider, Flex, Heading, Input, Stack, FormControl, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// hooks
import useAuth from '../../hooks/useAuth';

import ErrorMessage from '../atom/form/ErrorMessage';

// login&signinリファクタリング対象
const schema = yup.object().shape({
  email: yup.string().email('正しいメールアドレスを入力してください').required('emailは必須です'),
  password: yup
    .string()
    .min(4, 'passwordは4文字以上で入力して下さい')
    .max(15, 'passwordは15文字以内で入力して下さい')
    .required('パスワードは必須です'),
});

const Login = memo(() => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ログイン
        </Heading>
        <Divider my={4} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <Stack spacing={6} py={4} px={10}>
              <Input type="text" placeholder="email" {...register('email')} />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
              <Input type="password" placeholder="password" {...register('password')} py={4} px={10}/>
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
              <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
                ログイン
              </Button>
            </Stack>
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
});

export default Login;
