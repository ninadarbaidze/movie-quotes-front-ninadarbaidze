import { MovieTypes } from 'types';
import { FormikHelpers } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import { getMovies } from 'services';
import { AuthContext } from 'store';

export const useCustomDropdown = (props: {
  form: FormikHelpers<MovieTypes>;
}) => {
  const { form } = props;
  const { data: session } = useSession();
  const ctx = useContext(AuthContext);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [openList, setOpenList] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState('');

  useEffect(() => {
    const getData = async () => {
      let currentLan = router.locale;
      let token = session ? session.accessToken : ctx.token;

      try {
        const response = await getMovies(token as string);
        const newData = response.data.map((movies: MovieTypes) => {
          return {
            id: movies._id,
            movieName: movies[currentLan!].movieName,
            image: movies.image,
          };
        });
        setData(newData);
      } catch (err: any) {}
    };
    getData();
  }, [ctx.token, router.locale, session]);

  const dropDownHandler = (id: string) => {
    form.setFieldValue('movieId', id);
    setSelectedMovie(id);
    setOpenList((prev) => !prev);
  };
  return { data, openList, selectedMovie, dropDownHandler, setOpenList };
};
