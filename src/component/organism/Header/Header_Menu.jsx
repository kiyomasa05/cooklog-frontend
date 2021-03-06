import React, { memo, useCallback } from 'react';
import { Flex, Heading, Text, Box, useDisclosure } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import MenuIconButton from '../../atom/btn/MenuIconButton';
import MenuDrawer from '../../molcules/MenuDrawer';
import useLoginUser from '../../../hooks/useLoginUser';
import useLogout from '../../../hooks/useLogout';
import HeaderMenuBtn from '../../atom/btn/HeaderMemuBtn';

import useLoginCheck from '../../../hooks/useLoginCheck';

const HeaderMenu = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const history = useHistory();
  const { logout } = useLogout();
  const { loginUser } = useLoginUser();

  const userId = loginUser ? loginUser.user.id : null;
  const onClickHome = useCallback(() => history.push('/'), [history]);
  const onClickLogin = useCallback(() => history.push('/login'), [history]);
  const onClickSignup = useCallback(() => history.push('/signup'), [history]);
  const onClickIndex = useCallback(() => history.push('/index'), [history]);
  const onClickSearch = useCallback(() => history.push('/search'), [history]);
  const onClickPost = () => history.push(`/users/${userId}/post`);
  const onClickMypage = () => history.push(`/users/${userId}`);
  const onClickLogout = () => logout();
  const { LoginState } = useLoginCheck();
  return (
    <>
      <Flex
        as="nav"
        bg="yellow.200"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
        pos="fixed"
        top="0"
        w="100%"
        zIndex={2}
      >
        <Flex align="center" as="a" mr={8} _hover={{ cursor: 'pointer' }} onClick={onClickHome}>
          <Heading as="h1" fontSize={{ base: 'lg', md: 'xl' }}>
            <Text fontSize={{ base: '24px', md: '30px' }} color="tomato">
              COOKLOG
            </Text>
          </Heading>
        </Flex>
        <Flex align="center" fontSize="md" flexGrow={2} display={{ base: 'none', md: 'flex' }}>
          <Box pr={4}>
            {/* eslint-disable  */}
            {/* loginUser???false????????? */}
            {LoginState || (
              <>
                <HeaderMenuBtn onClick={onClickSignup}>
                  ????????????
                </HeaderMenuBtn>
                <HeaderMenuBtn onClick={onClickLogin}>
                  ????????????
                </HeaderMenuBtn>
              </>
            )}
             {/* loginUser???true????????? */}
            {LoginState && (
                <>
                  <HeaderMenuBtn onClick={onClickMypage}>
                    ???????????????
                  </HeaderMenuBtn>
                  <HeaderMenuBtn onClick={onClickPost}>
                    ???????????????
                  </HeaderMenuBtn>
                  <HeaderMenuBtn onClick={onClickIndex}>
                    ????????????
                  </HeaderMenuBtn>
                  <HeaderMenuBtn onClick={onClickSearch}>
                    ???????????????
                  </HeaderMenuBtn>
                  <HeaderMenuBtn onClick={onClickLogout}>
                    ???????????????
                  </HeaderMenuBtn>
              </>
            )}
            {/* eslint-enable */}
          </Box>
        </Flex>
        <MenuIconButton onOpen={onOpen} btnRef={btnRef} />
      </Flex>
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        btnRef={btnRef}
        onClickHome={onClickHome}
        onClickSignup={onClickSignup}
        onClickLogin={onClickLogin}
        onClickIndex={onClickIndex}
        onClickSearch={onClickSearch}
        onClickLogout={onClickLogout}
        onClickPost={onClickPost}
        onClickMypage={onClickMypage}
      />
    </>
  );
});

export default HeaderMenu;
