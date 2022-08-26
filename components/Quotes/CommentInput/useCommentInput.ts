import { FormikState, useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { commentPost, getQuoteById } from 'services';
import { AuthContext, QuoteContext, UserContext } from 'store';
import { CommentRequest } from 'types';
import { InputTypes } from './types';
import openSocket from 'socket.io-client';

export const useCommentInput = (props: { quoteId: string }) => {
  const { quoteId } = props;
  const { data: session } = useSession();
  const userCtx = useContext(UserContext);
  const ctx = useContext(AuthContext);

  const onSubmit = async (
    values: InputTypes,
    actions: {
      resetForm: (
        nextState?: Partial<FormikState<InputTypes>> | undefined
      ) => void;
    }
  ) => {
    try {
      let token: string | Blob | unknown = session
        ? session.accessToken
        : ctx.token;
      const userId: string | Blob | unknown = session
        ? session.userId
        : ctx.userId;
      const data: CommentRequest = {
        comment: values.comment,
        userId: userId as string,
        quoteId: quoteId,
      };
      actions.resetForm();
      await commentPost(data, token as string);
    } catch (error: any) {
      throw new Error('Request failed!');
    }
  };

  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    onSubmit: onSubmit,
  });

  const myLoader = () => {
    return `${process.env.NEXT_PUBLIC_API_URL}/${userCtx.userState.profileImage}`;
  };

  return { formik, userCtx, myLoader };
};
