import { useContext } from 'react';
import { AuthContext } from 'store';
import { useTranslation } from 'react-i18next';

const useHeader = () => {
  const { t } = useTranslation();
  const ctx = useContext(AuthContext);

  const changeRegistrationModalState = ctx.changeRegistrationModalState;

  return { t, changeRegistrationModalState };
};

export default useHeader;