import type { GetStaticProps } from 'next';
import {
  EditProfile,
  FeedWrapper,
  AlertPopup,
  ErrorPopup,
  FeedBackdrop,
  Loader,
} from 'components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useProfile } from 'hooks/useProfile';

const Profile = () => {
  const { userCtx, currLang } = useProfile();

  return (
    <>
      <Head>
        <title>
          {currLang === 'en'
            ? 'My profile - Movie Quotes'
            : 'ჩემი პროფილი - Movie Quotes'}
        </title>
      </Head>
      {userCtx.loader ? (
        <>
          <Loader className='absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-50' />
          <FeedBackdrop
            onClick={() => {}}
            className=' bg-mainDark bg-opacity-100'
          />
        </>
      ) : (
        <>
          <FeedWrapper className='xl:mr-[10%] md:mt-10 relative'>
            {userCtx.successPopup && <AlertPopup />}
            {userCtx.errorPopup && <ErrorPopup />}
            <EditProfile />
          </FeedWrapper>
        </>
      )}
    </>
  );
};

export default Profile;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'profile',
        'home',
        'movies',
        'quotes',
      ])),
    },
  };
};
