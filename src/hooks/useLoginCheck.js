import { useContext } from 'react';

import { LoginCheckContext } from './providers/LoginCheckProvider';

const useLoginCheck = () => useContext(LoginCheckContext);

export default useLoginCheck;
