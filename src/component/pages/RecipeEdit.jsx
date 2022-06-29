/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Divider,
  Heading,
  Input,
  Textarea,
  Stack,
  Image,
  Button,
  Center,
  NumberInput,
  NumberInputField,
  // NumberInputStepper,
  // NumberIncrementStepper,
  // NumberDecrementStepper,
  // Slider,
  // SliderTrack,
  // SliderFilledTrack,
  // SliderThumb,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
// import axios from 'axios';
import { useForm } from 'react-hook-form';

// hooks
import useLoginUser from '../../hooks/useLoginUser';
// import useMessage from '../../hooks/useMessege';
import useAuthCheck from '../../hooks/useAuthCheck';

// url
// import { recipeEditURL } from '../../urls/index';
import useRecipeEdit from '../../hooks/useRecipeEdit';

const RecipeEdit = memo(() => {
  // const { recipe } = props;
  const { recipeEdit, recipeEditNoImage, loading } = useRecipeEdit;

  const { state } = useLocation();
  const { loginUser } = useLoginUser();
  // const history = useHistory();
  // const { showMessage } = useMessage();
  // const [loading, setLoading] = useState(false);
  const { CheckAuth } = useAuthCheck();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  // eslint-disable-next-line no-console
  // console.log(props.food);
  // api送信state
  // const [title, setTitle] = useState(state.title);
  // const [food, setFood] = useState(state.food);
  // const [process, setProcess] = useState(state.process);
  // const [time_required, setTime_required] = useState(state.time_required);
  const [image, setImage] = useState({});
  const handleImageSelect = (e) => {
    const reader = new FileReader();
    // 画像をbase64にエンコード
    const { files } = e.target;
    if (files) {
      reader.onload = () => {
        setImage({
          data: reader.result,
          name: files[0] ? files[0].name : 'unknownfile',
        });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  useEffect(() => {
    CheckAuth();
  }, []);

  useEffect(() => {
    setValue('title', state.title);
    setValue('food', state.food);
    setValue('process', state.process);
    setValue('time_required', state.time_required);
  }, []);

  const onSubmit = (data) => {
    if (image.name) {
      recipeEdit(data, loginUser.id, image);
    } else {
      recipeEditNoImage(data, loginUser.id);
    }
  };
  // const onSubmit = (data) => {
  //   recipeEdit(data, loginUser.id, image);
  // };
  // yu-za ID送る

  // const onSubmit = () => {
  //   setLoading(true);
  //   axios
  //     .patch(
  //       recipeEditURL(state.id),
  //       {
  //         recipe: {
  //           user_id: loginUser.user.id,
  //           title,
  //           time_required,
  //           food,
  //           process,
  //           image: {
  //             data: image.data,
  //             name: image.name,
  //           },
  //         },
  //       },
  //       { withCredentials: true }
  //     )
  //     .then((response) => {
  //       if (response.data.status === 'updated') {
  //         showMessage({ title: '編集に成功しました', status: 'success' });
  //         setLoading(false);
  //         history.push('/index');
  //       } else if (response.data.status === 422) {
  //         showMessage({ title: `${response.data.errors}`, status: 'error' });
  //         setLoading(false);
  //       }
  //     })
  //     .catch((e) => {
  //       showMessage({ title: '編集できませんでした', status: 'error' });
  //       setLoading(false);
  //       // eslint-disable-next-line no-console
  //       console.log(e);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  return (
    <Flex mt="80px" alignItems="center" justifyContent="center">
      <Box bg="white" w={{ base: 'sm', md: '2xl' }} p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          レシピ編集
        </Heading>
        <Divider my={4} />
        <FormControl onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <FormControl>
              <Input
                variant="flushed"
                fontSize={{ base: 'md', md: 'xl' }}
                radii="1rem"
                placeholder="タイトル(20文字まで)"
                // value={state.title}
                {...register('title', { required: true, maxLength: 50 })}
              />
              {errors.title?.type === 'required' && (
                <FormHelperText fontSize="sm" color="red" m={0} p={0}>
                  タイトルは必須です
                </FormHelperText>
              )}
            </FormControl>
          </Stack>
          <Stack>
            <FormLabel color="gray.500" htmlFor="image" mt="4" mb="-2" fontSize={{ base: 'sm', md: 'md' }}>
              レシピ写真
            </FormLabel>
            <Image
              src={
                // eslint-disable-next-line no-nested-ternary
                !image.data ? (!state?.image_url ? 'gibbresh.png' : state?.image_url) : image.data
              }
              // {!image.data ? 'gibbresh.png' : image.data}
              fallbackSrc="https://via.placeholder.com/250"
              boxSize={{ base: '250px', md: '400px' }}
              textAlign="center"
            />
          </Stack>
          <Stack>
            <Input
              type="file"
              placeholder="画像アップロード"
              name="image"
              accept="image/png,image/jpeg"
              onChange={handleImageSelect}
            />
          </Stack>

          <Stack mt={3}>
            <FormLabel color="gray.500" htmlFor="food" mb="-2" fontSize={{ base: 'sm', md: 'md' }}>
              材料
            </FormLabel>
            <Textarea
              id="food"
              placeholder="例）鶏肉、キャベツ、砂糖、塩..."
              fontSize={{ base: 'sm', md: 'md' }}
              // value={state.food}
              {...register('food', { required: true })}
            />
          </Stack>
          <Stack mt={3}>
            <FormLabel color="gray.500" htmlFor="process" mb="-2" fontSize={{ base: 'sm', md: 'md' }}>
              手順
            </FormLabel>
            <Textarea
              id="process"
              placeholder="例）1 キャベツを千切りしておく 2 鶏肉を茹でる..."
              fontSize={{ base: 'sm', md: 'md' }}
              // value={state?.process}
              {...register('process', { required: true })}
            />
          </Stack>
          <FormLabel color="gray.500" htmlFor="time_required" mt="2" mb="0">
            所要時間
          </FormLabel>
          <Flex>
            <NumberInput
              maxW="100px"
              mr="2rem"
              id="time_required"
              // value={state.time_required}
              {...register('time_required', { required: true })}
              // onChange={handleChange}
            >
              <NumberInputField />
              {/* id="time_required" {...register('time_required', { required: true })} /> */}
              {/* 上下ボタン */}
              {/* <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper> */}
            </NumberInput>
            {/* <Slider>
              <SliderThumb
                flex="1"
                focusThumbOnChange={false}
                // value={state.time_required}
                // {...register('time_required', { required: true })}
                onChange={handleChange}
              />
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb fontSize="sm" boxSize="32px">
                {time_required}
              </SliderThumb>
            </Slider> */}
          </Flex>
          <Center>
            <Button mt={4} colorScheme="teal" width="75%" isLoading={loading} type="submit">
              レシピ登録
            </Button>
          </Center>
        </FormControl>
      </Box>
    </Flex>
  );
});

export default RecipeEdit;
