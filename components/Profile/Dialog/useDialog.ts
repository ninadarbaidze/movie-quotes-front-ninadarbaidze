import { useContext } from 'react';
import { UserContext } from 'store';

export const useDialog = () => {
  const userCtx = useContext(UserContext);
  return { userCtx };
};
