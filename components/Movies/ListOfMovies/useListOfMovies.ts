import { useContext, useState, useEffect } from 'react';
import { MovieContext, AuthContext } from 'store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getMovies } from 'services';
import { UpdatedMovieTypes } from './types';

import openSocket from 'socket.io-client';

export const useListOfMovies = () => {
  const movieCtx = useContext(MovieContext);
  const { t } = useTranslation();
  const ctx = useContext(AuthContext);
  const [data, setData] = useState<UpdatedMovieTypes[]>([]);
  const [movieSum, setMovieSum] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  const onChange = (event: { target: { value: string } }) => {
    setSearchQuery(event.target.value);
  };

  let currentLan = router.locale;
  useEffect(() => {
    const getData = async () => {
      let token = session ? session.accessToken : ctx.token;
      try {
        const response = await getMovies(token as string);
        const movieNumber = response.data.length;
        const newData = response.data.map((movies: UpdatedMovieTypes) => {
          return {
            id: movies._id,
            movieName: movies[currentLan!].movieName,
            year: movies.year,
            image: movies.image,
            quotesQuantity: movies!.quotes!.length,
          };
        });
        setMovieSum(movieNumber);
        setData(newData);
      } catch (err: any) {}
    };
    getData();
  }, [ctx.token, ctx.userId, currentLan, session]);

  useEffect(() => {
    const socket = openSocket(`${process.env.NEXT_PUBLIC_API_URL}`);
    socket.on('movies', (data) => {
      const movie = {
        id: data.movie,
        movieName: data.movie[currentLan!].movieName,
        year: data.movie.year,
        image: data.movie.image,
        quotesQuantity: data.movie!.quotes!.length,
      };
      if (data.action === 'create') {
        addMovie(movie);
      }
    });
  }, [currentLan]);

  const addMovie = (movie: UpdatedMovieTypes) => {
    setData((prevState) => {
      let updatedMovies: UpdatedMovieTypes[] = [];
      updatedMovies = [...prevState];
      updatedMovies!.unshift(movie);
      return updatedMovies;
    });
  };

  const openMovieForm = () => {
    movieCtx.movieCreationStateHandler();
  };

  return {
    movieCtx,
    t,
    ctx,
    data,
    movieSum,
    router,
    session,
    openMovieForm,
    setMovieSum,
    setData,
    searchQuery,
    onChange,
  };
};
