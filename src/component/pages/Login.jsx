import React, { memo } from 'react';
import { Box, Divider, Flex, Heading, Input, Stack, FormControl, Button, FormLabel } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// hooks
import useAuth from '../../hooks/useAuth';
import ErrorMessage from '../atom/form/ErrorMessage';

const LoginSchema = yup.object().shape({
  email: yup.string().email('正しいメールアドレスを入力してください').required('emailは必須です'),
  password: yup
    .string()
    .min(4, 'passwordは4文字以上で入力して下さい')
    .max(15, 'passwordは15文字以内で入力して下さい')
    .required('パスワードは必須です'),
});
const Login = memo(() => {
  const { login, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
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
            <Stack spacing={2} py={4} px={5}>
              <FormLabel htmlFor="email">email</FormLabel>
              <Input type="email" id="email" autoComplete="email" placeholder="email" {...register('email')} />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
              <FormLabel htmlFor="password">password</FormLabel>
              <Input
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="password"
                {...register('password')}
              />
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
              <Button colorScheme="teal" type="submit" isLoading={loading}>
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
