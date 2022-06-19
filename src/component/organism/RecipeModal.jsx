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
import NoImage from '../../images/no-image.png';
import RecipeEditBtn from './EditBtn';
import FavoBtn from './FavoBtn';

const RecipeModal = memo((props) => {
  const { isOpen, onClose, recipes, loginUser } = props;

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
          {/* ここは表示によってわけるところ */}
          {loginUser &&
            (loginUser.user.id === recipes?.user_id ? (
              <RecipeEditBtn recipes={recipes}>編集</RecipeEditBtn>
            ) : (
              <FavoBtn loginUser={loginUser} recipes={recipes} />
            ))}
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
