import React, { memo } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Text,
  Wrap,
  Image,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import moment from 'moment/moment';
// import { useHistory } from 'react-router-dom';

// import { useFavo } from '../hooks/useFavo';
import NoImage from '../images/no-image.png';
import RecipeEditBtn from './EditBtn';
import FavoBtn from './FavoBtn';

const RecipeModal = memo((props) => {
  // const { isOpen, onClose, recipes, loginUser } = props;
  const { isOpen, onClose, recipes } = props;

  // const history = useHistory();
  // const { callFavorite, deleteFavorite, initialFavoState } = useFavo();

  // useEffect(() => {
  //   initialFavoState(recipes?.id);
  // }, [recipes]);

  // // お気に入り登録機能
  // const onClickFavo = () => {
  //   callFavorite(recipes.id, loginUser.user.id);
  // };
  // // お気に入り解除機能
  // const onClickFavosol = () => {
  //   deleteFavorite(recipes.id, loginUser.user.id);
  // };

  // const recipeId = recipes?.id;
  // const onClickRecipeEdit = useCallback(
  //   () =>
  //     history.push({
  //       pathname: `/${recipeId}/edit`,
  //       state: recipes,
  //     }),
  //   [history]
  // );

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`${recipes?.title}`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Image
            borderRadius="md"
            boxSize="260px"
            src={recipes?.image_url ? `${recipes?.image_url}` : NoImage}
            m="auto"
          />
          <Stack>
            <Wrap>
              <Text fontSize="sm" color="gray">
                {`所要時間${recipes?.time_required}分`}
              </Text>
              <Text fontSize="sm" color="gray">
                レシピ作成日
                {`${moment(recipes?.created_at).format('YYYY-MM-DD')}`}
              </Text>
            </Wrap>
            <Text fontSize="sm" color="gray">{`食材:${recipes?.food}`}</Text>
            <Text fontSize="sm" color="gray" maxW="280px">
              {`手順:${recipes?.process}`}
            </Text>
            <Text fontSize="sm" color="gray" maxW="280px" whiteSpace="nowrap">
              {`レシピ作成者:${recipes?.user_id}`}
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <RecipeEditBtn>編集</RecipeEditBtn>
          <FavoBtn />
          {
            /* {conditionA ?
                    (!conditionB ?
                        (<p>A</p>) :
                        (<p>B</p>)
                    ) :
                    (<p>C</p>)
          } */
            /* 関数としてここは分ける 関数モーダルになる */
            /* {loginUser.user.id === recipes?.user_id ? (
              // もしログインユーザーのidとレシピのidが一緒の場合true:false
              (favorite === true ? (
                // かつもし、favoriteがtrueの場合 true:false
                <Button
                leftIcon={<StarIcon />}
                colorScheme="yellow"
                mr={3}
                onClick={onClickFavosol}
              >
                お気に入り登録済
              </Button>)
              : (<Button
                leftIcon={<StarIcon color="white" />}
                colorScheme="blue"
                color="white"
                mr={3}
                onClick={onClickFavo}
              >
                お気に入り登録
              </Button>
                )):
              (<Button
                leftIcon={<EditIcon color="black" />}
                colorScheme="gray"
                color="black"
                mr={3}
                onClick={onClickRecipeEdit}
              >
                編集
              </Button>)) */
            // もしログインユーザーのidとレシピのidが別の場合false
            // ) : (
            //   <Button
            //     leftIcon={<EditIcon color="black" />}
            //     colorScheme="gray"
            //     color="black"
            //     mr={3}
            //     onClick={onClickRecipeEdit}
            //   >
            //     編集
            //   </Button>
            // )}
            // {/* loginしているuser_idと違うレシピだけお気に入りボタン表示 logoutするとここがコンパイルエラーになる
            // もしログインユーザーのidとレシピを登録したidが違う場合、→favo使える
            // 一緒の場合、編集が出る
            // さらにもし、favoriteがfalseの場合、フォボボタンが押せる
            // favoriteがtrueの場合、解除ボタンが押せる
            // */}
            // { loginUser.user.id !== recipes?.user_id ? (favorite === false ? (
            //   <Button
            //     leftIcon={<StarIcon color="white" />}
            //     colorScheme="blue"
            //     color="white"
            //     mr={3}
            //     onClick={onClickFavo}
            //   >
            //     お気に入り登録
            //   </Button>
            // ) : (
            //   <Button
            //     leftIcon={<StarIcon />}
            //     colorScheme="yellow"
            //     mr={3}
            //     onClick={onClickFavosol}
            //   >
            //     お気に入り登録済
            //   </Button>
            // )
            // ) : (
            //   <div>エラー</div>
            // )}
          }
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            <SmallCloseIcon mr="2" />
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default RecipeModal;
