import { useContext } from 'react';

import { LoginUserContext } from './providers/LoginUserProvider';

const useLoginUser = () => useContext(LoginUserContext);

export default useLoginUser;
