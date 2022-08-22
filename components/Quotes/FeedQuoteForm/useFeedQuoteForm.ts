import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { addQuote } from 'services';
import { AuthContext } from 'store';
import { QuoteDefaultValues, QuoteFormValues } from './types';

export const useFeedQuoteForm = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const ctx = useContext(AuthContext);

  const defaultValues: QuoteDefaultValues = {
    quoteEN: '',
    quoteGE: '',
    movieId: '',
    userId: '',
    image: '',
  };

  const onSubmit = async (values: QuoteFormValues) => {
    const userId: string | Blob | unknown = session
      ? session.userId
      : ctx.userId;
    const token: string | Blob | unknown = session
      ? session.accessToken
      : ctx.token;
    const formData = new FormData();
    const keys = Object.keys(values);

    keys.forEach((key: string) => {
      formData.append(`${key}`, values[key as keyof QuoteFormValues]);
    });
    formData.append('userId', userId as string);

    try {
      await addQuote(formData, token as string);
    } catch (error: any) {
      throw new Error('Request failed!');
    }
  };

  return { t, onSubmit, defaultValues };
};
