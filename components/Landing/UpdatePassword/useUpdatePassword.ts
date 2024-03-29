import { useContext } from 'react';
import { useFormik } from 'formik';
import { updatePasswordSchema } from 'schema';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { AuthContext } from 'store';
import { updatePassword } from 'services';
import { PasswordRecoveryTypes } from 'types';

export const useUpdatePassword = () => {
  const ctx = useContext(AuthContext);
  const { t } = useTranslation();
  const router = useRouter();
  const token = router.query.token;

  const onSubmit = async (values: PasswordRecoveryTypes) => {
    try {
      await updatePassword({ ...values, token });
      router.push(`/?modal=password-updated-successfully`);
      ctx.changePasswordUpdateState(false);
    } catch (error) {
      router.replace(`/?modal=password-update-failed`);
      ctx.changePasswordUpdateState(false);
      throw new Error('Request failed!');
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      repeatPassword: '',
    },
    onSubmit: onSubmit,
    validationSchema: updatePasswordSchema,
  });

  return { formik, t };
};
