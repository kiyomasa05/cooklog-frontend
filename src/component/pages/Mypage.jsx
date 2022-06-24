/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  Wrap,
  Image,
  WrapItem,
  Button,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  useColorModeValue,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';

// image
import NoImage from '../../images/no-image.png';

// hooks
import useLoginUser from '../../hooks/useLoginUser';
import useAuthCheck from '../../hooks/useAuthCheck';
import useGetRecipe from '../../hooks/useGetRecipe';
import useSelectRecipe from '../../hooks/useSelectRecipe';
import useGetFavo from '../../hooks/useGetFavo';

// orgamisms
import RecipeCard from '../organism/RecipeCard';
import RecipeModal from '../organism/RecipeModal';

const Mypage = memo(() => {
  const { loginUser } = useLoginUser();
  const { getRecipe, recipes, loading } = useGetRecipe();
  const { getFavoRecipe, FavoRecipes } = useGetFavo();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSelectRecipe, selectedRecipe } = useSelectRecipe();
  const history = useHistory();
  const { id } = useParams();

  const { CheckAuth, UserLoading } = useAuthCheck();

  // リロード時にログイン状態が消えないように認証する
  // ローカルホストではChromeでは検証不可（cookieのセキュア属性の関係）なので、FireFoxで検証
  useEffect(() => {
    CheckAuth();
  }, []);

  // 初回のレンダー時にすべてのレシピを取得する
  useEffect(() => {
    getRecipe();
  }, []);

  // 初回のレンダー時にUserのお気に入りレシピを取得する
  useEffect(() => {
    getFavoRecipe(id);
  }, []);

  // クリック時にモーダルを開く
  const onClickRecipe = useCallback(
    // eslint-disable-next-line no-shadow
    (id) => {
      onSelectRecipe({ id, recipes, onOpen });
    },
    [recipes, onSelectRecipe, onOpen]
  );

  // プロフィール編集の関数
  const onClickProfileEdit = useCallback(() => history.push(`/users/${id}/edit`), [history]);

  // タブ背景色の定義
  const colors = useColorModeValue(['red.50', 'blue.50'], ['red.900', 'blue.900']);
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];

  // すべてのレシピから自分のidと一致するレシピのみにソートする
  const MyRecipes = recipes.filter((recipe) => recipe.user_id === loginUser.user.id);
  return (
    <>
      {/* user情報を取得するまで */}
      {UserLoading ? (
        <Center>
          <Spinner thickness="6px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" mt="90px" />
        </Center>
      ) : (
        // user情報取得後
        <>
          {/* // 上部のプロフィール部分  */}
          <Grid h="200px" templateRows="repeat(6)" templateColumns="repeat(5)" gap={1} mx="auto" mt={78}>
            <GridItem rowSpan={1} colSpan={6} ml={2} pb="-2" fontSize="lg">
              {loginUser && `${loginUser.user.name}   さん`}
            </GridItem>
            <GridItem rowSpan={3} colSpan={2} mx="auto" display="flex" justifyContent="center" alignItems="center">
              <Image
                borderRadius="full"
                boxSize="100px"
                src={!loginUser ? 'gibbresh.png' : loginUser.user.avatar_url}
                fallbackSrc="https://via.placeholder.com/250"
                border="2px"
                borderColor="gray.200"
              />
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={2}
              textAlign="center"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              投稿レシピ
            </GridItem>
            <GridItem rowSpan={1} colSpan={2} display="flex" justifyContent="center" alignItems="center">
              お気に入り
            </GridItem>
            <GridItem rowSpan={1} colSpan={2} display="flex" justifyContent="center" alignItems="center" fontSize="2xl">
              {MyRecipes && `${MyRecipes.length}`}
            </GridItem>
            <GridItem rowSpan={1} colSpan={2} display="flex" justifyContent="center" alignItems="center" fontSize="2xl">
              {FavoRecipes && `${FavoRecipes.length}`}
            </GridItem>
            <GridItem rowSpan={1} colSpan={6}>
              <Button w="100%" h="90%" onClick={onClickProfileEdit}>
                編集
              </Button>
            </GridItem>
          </Grid>
          {/* // レシピ表示部 */}
          {loading ? (
            <Center>
              <Spinner thickness="6px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" mt="90px" />
            </Center>
          ) : (
            <Tabs isFitted variant="enclosed" onChange={(index) => setTabIndex(index)} bg={bg}>
              <TabList mb="1em">
                <Tab>投稿レシピ</Tab>
                <Tab>お気に入りレシピ</Tab>
              </TabList>
              <TabPanels>
                投稿レシピ
                <TabPanel>
                  <Wrap>
                    {MyRecipes.map((recipe) => (
                      <WrapItem key={recipe.id} overflow="hidden" m={0}>
                        <RecipeCard
                          id={recipe.id}
                          imageUrl={recipe.image_url ? recipe.image_url : NoImage}
                          title={recipe.title}
                          time_required={recipe.time_required}
                          food={recipe.food}
                          created_at={recipe.created_at}
                          process={recipe.process}
                          onClick={onClickRecipe}
                        />
                      </WrapItem>
                    ))}
                  </Wrap>
                  {selectedRecipe && (
                    <RecipeModal recipes={selectedRecipe} isOpen={isOpen} onClose={onClose} loginUser={loginUser} />
                  )}
                </TabPanel>
                <TabPanel>
                  {/* お気に入りレシピ */}
                  <Wrap>
                    {FavoRecipes.map((recipe) => (
                      <WrapItem key={recipe.id} overflow="hidden" m={0}>
                        <RecipeCard
                          id={recipe.id}
                          imageUrl={recipe.image_url ? recipe.image_url : NoImage}
                          title={recipe.title}
                          time_required={recipe.time_required}
                          food={recipe.food}
                          created_at={recipe.created_at}
                          process={recipe.process}
                          onClick={onClickRecipe}
                        />
                      </WrapItem>
                    ))}
                  </Wrap>
                  {selectedRecipe && (
                    <RecipeModal recipes={selectedRecipe} isOpen={isOpen} onClose={onClose} loginUser={loginUser} />
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
          {/* レシピロードおわったところ  */}
        </>
        // ロード終わったところ
      )}
    </>
  );
});

export default Mypage;
