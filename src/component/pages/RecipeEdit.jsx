/* eslint-disable react/no-children-prop */
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
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// hooks
import useLoginUser from '../../hooks/useLoginUser';
import useAuthCheck from '../../hooks/useAuthCheck';
import useRecipeEdit from '../../hooks/useRecipeEdit';

const RecipeEdit = memo(() => {
  const { recipeEdit, recipeEditNoImage, loading } = useRecipeEdit();
  const { state } = useLocation();
  const { loginUser } = useLoginUser();
  const { CheckAuth } = useAuthCheck();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  const [time_required, setTime_required] = useState(state.time_required);

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
  }, []);

  const recipeId = state.id;
  const onSubmit = (data) => {
    if (image.name) {
      recipeEdit(recipeId, data, loginUser.id, image, time_required);
    } else {
      recipeEditNoImage(recipeId, data, loginUser.id, time_required);
    }
  };

  // eslint-disable-next-line no-shadow
  const handleChange = (time_required) => setTime_required(time_required);

  return (
    <Flex mt="80px" alignItems="center" justifyContent="center">
      <Box bg="white" w={{ base: 'sm', md: '2xl' }} p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          レシピ編集
        </Heading>
        <Divider my={4} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <Stack>
              <FormControl>
                <Input
                  variant="flushed"
                  fontSize={{ base: 'md', md: 'xl' }}
                  radii="1rem"
                  placeholder="タイトル(20文字まで)"
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
                {...register('food', { required: true })}
              />
              {errors.food?.type === 'required' && (
                <FormHelperText fontSize="sm" color="red" m={0} p={0}>
                  材料は必須です
                </FormHelperText>
              )}
            </Stack>
            <Stack mt={3}>
              <FormLabel color="gray.500" htmlFor="process" mb="-2" fontSize={{ base: 'sm', md: 'md' }}>
                手順
              </FormLabel>
              <Textarea
                id="process"
                placeholder="例）1 キャベツを千切りしておく 2 鶏肉を茹でる..."
                fontSize={{ base: 'sm', md: 'md' }}
                {...register('process', { required: true })}
              />
              {errors.process?.type === 'required' && (
                <FormHelperText fontSize="sm" color="red" m={0} p={0}>
                  手順は必須です
                </FormHelperText>
              )}
            </Stack>
            <FormLabel color="gray.500" htmlFor="time_required" mt="2" mb="0">
              所要時間
            </FormLabel>
            <Flex>
              <NumberInput maxW="100px" mr="2rem" id="time_required" value={time_required} onChange={handleChange}>
                <NumberInputField />
                {/* 上下ボタン */}
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Slider flex="1" focusThumbOnChange={false} value={time_required} onChange={handleChange}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize="sm" boxSize="32px" children={time_required} />
              </Slider>
            </Flex>
            <Center>
              <Button mt={4} colorScheme="teal" width="75%" isLoading={loading} type="submit">
                レシピ登録
              </Button>
            </Center>
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
});

export default RecipeEdit;
