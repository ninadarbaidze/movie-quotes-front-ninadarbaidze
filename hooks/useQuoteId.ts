import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { likePost } from 'services';
import { AuthContext, QuoteContext } from 'store';
import openSocket from 'socket.io-client';
import { QuotesListTypes } from 'types';

export const useQuoteId = (props: { data: QuotesListTypes }) => {
  const { data } = props;
  const { data: session, status } = useSession();
  const { t } = useTranslation();
  const router = useRouter();
  const cuurLang = router.locale;
  const ctx = useContext(AuthContext);
  const quoteCtx = useContext(QuoteContext);
  const [comments, setComments] = useState([...data.comments]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [likes, setLikes] = useState([data.likes]);

  const quoteId = router.query.quoteId;
  let token = session ? session.accessToken : ctx.token;
  let userId: string | Blob | unknown = session ? session.userId : ctx.userId;

  useEffect(() => {
    if (status === 'unauthenticated' && !ctx.isLoggedIn) {
      router.push('/');
    }
  }, [ctx.isLoggedIn, router, status]);

  const liked = likes
    ? !!likes.find((user) => user === userId)
    : data.likes.find((user) => user === userId);
  const commented = comments
    ? !!comments.find((user) => user.userId._id === userId)
    : data.comments.find((user) => user.userId._id === userId);

  const deleteQuoteHandler = () => {
    setDeleteModal(true);
  };

  const likeHandler = useCallback(async () => {
    try {
      const data = {
        userId: userId as string,
        quoteId: quoteId as string,
      };
      await likePost(data, token as string);
    } catch (err: any) {}
  }, [quoteId, token, userId]);

  const commentRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleClick = () => {
    commentRef.current?.focus();
  };

  useEffect(() => {
    const socket = openSocket(`${process.env.NEXT_PUBLIC_API_URL}`);
    socket.on('quotes', (data) => {
      if (data.action === 'dislike' || data.action === 'like') {
        setLikes(data.likes);
      }
      if (data.action === 'addComment') {
        setComments(data.quote.comments);
      }
    });
  }, [userId]);

  const myLoader = () => {
    return `${process.env.NEXT_PUBLIC_API_URL}/${data.image}`;
  };
  return {
    t,
    myLoader,
    deleteModal,
    setDeleteModal,
    deleteQuoteHandler,
    quoteCtx,
    likeHandler,
    liked,
    commented,
    handleClick,
    commentRef,
    likes,
    comments,
    cuurLang,
  };
};
