import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Popup } from 'components';
import { useContext } from 'react';
import { AuthContext } from 'store';

const PopupComponent = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const ctx = useContext(AuthContext);
  const modalState = router.query.modal;
  const passwordModalState = router.query.token;
  console.log(router.query);

  return (
    <>
      {modalState === 'account-verified' && (
        <Popup
          icon={'/assets/images/check-icon.png'}
          heading={t('home:thanks')}
          paragraph={t('home:thanksText2')}
          buttonTxt={t('home:thanksBtn2')}
          url={'/'}
        />
      )}

      {modalState === 'verification-failed' && (
        <Popup
          icon={'/assets/images/error-icon.png'}
          heading={t('home:failed')}
          paragraph={t('home:failedTxt')}
          buttonTxt={t('home:failedTxtBtn')}
          url={'/'}
        />
      )}
      {modalState === 'email-sent' && (
        <Popup
          icon={'/assets/images/email-sent-icon.png'}
          heading={t('home:thanks')}
          paragraph={t('home:thanksText1')}
          buttonTxt={t('home:thanksBtn1')}
          url={'/'}
        />
      )}

      {modalState === 'password-recovery-email-sent' && (
        <Popup
          icon={'/assets/images/email-sent-icon.png'}
          heading={t('home:forgotPopH1')}
          paragraph={t('home:forgotPopH2')}
          buttonTxt={t('home:forgotPopBtn')}
          url={'/'}
        />
      )}

      {passwordModalState && ctx.changePasswordUpdateState(true)}

      {modalState === 'password-updated-successfully' && (
        <Popup
          icon={'/assets/images/check-icon.png'}
          heading={t('home:passSuccH1')}
          paragraph={t('home:passSuccH2')}
          buttonTxt={t('home:passBtn')}
          url={'/'}
        />
      )}

      {modalState === 'password-update-failed' && (
        <Popup
          icon={'/assets/images/error-icon.png'}
          heading={t('home:passErrH1')}
          paragraph={t('home:passErrH2')}
          buttonTxt={t('home:PassErrBtn')}
          url={'/'}
        />
      )}
    </>
  );
};

export default PopupComponent;
