/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  FormLabel,
  Button,
  Center,
  Image,
  FormHelperText,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

// hooks
import useUserEdit from '../../hooks/useUserEdit';
import useLoginUser from '../../hooks/useLoginUser';
import useAuthCheck from '../../hooks/useAuthCheck';

const UserEdit = memo(() => {
  const { userEdit, userEditNoAvatar, loading } = useUserEdit();
  const { loginUser } = useLoginUser();
  const { id } = useParams();

  const { CheckAuth } = useAuthCheck();

  useEffect(() => {
    CheckAuth();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  const [avatar, setAvatar] = useState({
    // data: loginUser.user.avatar_url ? loginUser.user.avatar_url : '',
    // name: loginUser.user.name,
  });
  const onSubmit = (data) => {
    if (avatar.name) {
      userEdit(data, id, avatar);
    } else {
      userEditNoAvatar(data, id);
    }
  };
  const handleImageSelect = (e) => {
    const reader = new FileReader();
    // 画像をbase64にエンコード
    const { files } = e.target;
    if (files) {
      reader.onload = () => {
        setAvatar({
          data: reader.result,
          name: files[0] ? files[0].name : 'unknownfile',
        });
      };
      reader.readAsDataURL(files[0]);
    }
  };
  // userの初期値をRHFのsetValueでセット
  useEffect(() => {
    setValue('name', loginUser.user.name);
    setValue('email', loginUser.user.email);
  });
  const Pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return (
    <Flex mt="80px" alignItems="center" justifyContent="center">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー編集
        </Heading>
        <Divider my={4} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} py={4} px={5}>
            <Stack>
              <FormLabel color="gray.500" htmlFor="avatar" mt="4" mb="-2" fontSize={{ base: 'sm', md: 'md' }}>
                アバター写真
              </FormLabel>
              <Image
                // 設定された画像と初期画像を表示
                src={
                  // eslint-disable-next-line no-nested-ternary
                  !avatar.data ? (!loginUser.user.avatar_url ? 'gibbresh.png' : loginUser.user.avatar_url) : avatar.data
                }
                fallbackSrc="https://via.placeholder.com/250"
                boxSize={{ base: '250px', md: '400px' }}
                borderRadius="full"
                textAlign="center"
                border="2px"
                borderColor="gray.200"
              />
            </Stack>
            <Stack>
              <Input
                type="file"
                placeholder="画像アップロード"
                name="avatar"
                accept="image/png,image/jpeg"
                onChange={handleImageSelect}
              />
            </Stack>
            {/* なまえ */}
            <FormLabel htmlFor="name" fontSize={{ base: 'md', md: 'md' }}>
              名前
            </FormLabel>
            <Input
              type="text"
              placeholder="name"
              value={loginUser.name}
              // eslint-disable-next-line
              {...register('name', { required: true, maxLength: 50 })}
            />
            {errors.name?.type === 'required' && (
              <FormHelperText fontSize="sm" color="red" m={0} p={0}>
                名前は必須です
              </FormHelperText>
            )}
            {errors.name?.type === 'maxLength' && (
              <FormHelperText fontSize="sm" color="red" m={0} p={0}>
                名前は50文字以内で入力して下さい
              </FormHelperText>
            )}
            {/* メール */}
            <FormLabel htmlFor="email" fontSize={{ base: 'md', md: 'md' }}>
              メール
            </FormLabel>
            <Input
              type="text"
              placeholder="email"
              value={loginUser.email}
              // eslint-disable-next-line
              {...register('email', { required: true, pattern: Pattern })}
            />
            {errors.email?.type === 'required' && (
              <Text fontSize="md" color="red" m={0} p={0}>
                emailは必須です
              </Text>
            )}
            {errors.email?.type === 'pattern' && (
              <Text fontSize="sm" color="red" m={0} p={0}>
                正しく入力して下さい
              </Text>
            )}
            {/* パスワード */}
            <FormLabel htmlFor="password" fontSize={{ base: 'md', md: 'md' }}>
              パスワード（変更も可能）
            </FormLabel>
            <Input
              type="password"
              placeholder="password"
              // eslint-disable-next-line
              {...register('password', {
                // required: true,
                minLength: 4,
              })}
            />
            {errors.password?.type === 'minLength' && (
              <Text fontSize="sm" color="red" m={0} p={0}>
                パスワードは4文字以上で入力して下さい
              </Text>
            )}
            <FormLabel htmlFor="password_cofirmation" fontSize={{ base: 'md', md: 'md' }}>
              パスワード（確認用）
            </FormLabel>
            <Input
              type="password"
              placeholder="password_cofirmation"
              // eslint-disable-next-line
              {...register('password_confirmation', {
                // required: true,
                minLength: 4,
              })}
            />
            {errors.password?.type === 'minLength' && (
              <Text fontSize="sm" color="red" m={0} p={0}>
                パスワードは4文字以上で入力して下さい
              </Text>
            )}
          </Stack>

          <Center>
            <Button mt={4} colorScheme="teal" width="75%" isLoading={loading} type="submit">
              変更する
            </Button>
          </Center>
        </form>
      </Box>
    </Flex>
  );
});

export default UserEdit;
