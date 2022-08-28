import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { getQuotes, searchQuotes } from 'services';
import { AuthContext, QuoteContext } from 'store';
import { QuotesListTypes } from 'types';
import openSocket from 'socket.io-client';

export const useFeed = () => {
  const router = useRouter();
  const ctx = useContext(AuthContext);
  const { status } = useSession();
  const quoteCtx = useContext(QuoteContext);
  const { data: session } = useSession();
  const [quotes, setQuotes] = useState<QuotesListTypes[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated' && !ctx.isLoggedIn) {
      router.push('/');
    }
  }, [ctx.isLoggedIn, router, status]);

  useEffect(() => {
    const getData = async () => {
      try {
        let token = session ? session.accessToken : ctx.token;
        let query;

        if (searchQuery.includes('@')) {
          query = 'movies';
        } else if (searchQuery.includes('#')) {
          query = 'quotes';
        }

        const queryName = searchQuery.substring(1);
        const queryType = query;

        const response = searchQuery
          ? await searchQuotes(queryName, queryType, page, token as string)
          : await getQuotes(page, token as string);
        setQuotes(response.data.quotes);
        setTotal(response.data.total);
      } catch (err: any) {}
    };
    getData();
  }, [ctx.token, page, searchQuery, session]);

  useEffect(() => {
    const socket = openSocket(`${process.env.NEXT_PUBLIC_API_URL}`);
    socket.on('quotes', (data) => {
      const quote = data.quote;
      if (data.action === 'create') {
        addQuote(quote);
      }
      if (data.action === 'addComment') {
        addComment(data.quote);
      }

      if (data.action === 'like') {
        addLike(data.likes, data.id);
      }

      if (data.action === 'dislike') {
        addLike(data.likes, data.id);
      }
    });
  }, []);

  const addQuote = (quote: QuotesListTypes) => {
    setQuotes((prevState) => {
      let updatedQuotes = [];
      updatedQuotes = [...prevState];
      updatedQuotes!.unshift(quote);
      return updatedQuotes;
    });
  };
  const addComment = (comment: QuotesListTypes) => {
    setQuotes((prevState) => {
      const quoteIds = prevState.map((quote) => quote._id);
      const index = quoteIds.indexOf(comment._id);
      let newState = [...prevState];
      newState.splice(index, 1, comment);
      return newState;
    });
  };

  const addLike = (likes: string[], id: string) => {
    setQuotes((prevState) => {
      const quoteIds = prevState.map((quote) => quote._id);
      const index = quoteIds.indexOf(id);
      let newState = [...prevState];
      newState[index].likes = likes;
      return newState;
    });
  };

  return {
    router,
    ctx,
    status,
    quoteCtx,
    quotes,
    setPage,
    page,
    total,
    searchQuery,
    setSearchQuery,
  };
};
