import React, { memo } from 'react';
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react';

import MenuDrawerBtn from '../atom/btn/MenuDrawerBtn';

import useLoginUser from '../../hooks/useLoginUser';

const MenuDrawer = memo((props) => {
  const {
    isOpen,
    onClose,
    btnRef,
    onClickHome,
    onClickSignup,
    onClickLogin,
    onClickIndex,
    onClickSearch,
    onClickLogout,
    onClickPost,
    onClickMypage,
  } = props;
  const { loginUser } = useLoginUser();
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs" finalFocusRef={btnRef}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton onClick={onClose} />
          <DrawerHeader align="center">メニュー</DrawerHeader>
          <DrawerBody p={0} bg="grey.100">
            {/* eslint-disable  */}
            {loginUser !== undefined ? (
              loginUser.logged_in ? (
                <>
                  <MenuDrawerBtn onClick={onClickHome} onClose={onClose} >
                    ホーム
                  </MenuDrawerBtn>
                  <MenuDrawerBtn onClick={onClickMypage} onClose={onClose}>
                    マイページ
                  </MenuDrawerBtn>
                  <MenuDrawerBtn onClick={onClickPost} onClose={onClose}>
                    レシピ投稿
                  </MenuDrawerBtn>
                  <MenuDrawerBtn onClick={onClickIndex} onClose={onClose}>
                    投稿一覧
                  </MenuDrawerBtn>
                  <MenuDrawerBtn onClick={onClickSearch} onClose={onClose}>
                    レシピ検索
                  </MenuDrawerBtn>
                  <MenuDrawerBtn onClick={onClickLogout} onClose={onClose}>
                    ログアウト
                  </MenuDrawerBtn>
                </>
              ) : (
                <>
                  <MenuDrawerBtn onClick={onClickHome} onClose={onClose} >
                    ホーム
                  </MenuDrawerBtn>
                  <MenuDrawerBtn onClick={onClickSignup} onClose={onClose}>
                    新規登録
                  </MenuDrawerBtn>
                  <MenuDrawerBtn onClick={onClickLogin} onClose={onClose}>
                    ログイン
                  </MenuDrawerBtn>
                </>
              )
            ) : null}
            {/* eslint-enable */}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});

export default MenuDrawer;