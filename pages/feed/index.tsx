import type { GetStaticProps } from 'next';
import {
  FeedBackdrop,
  FeedWrapper,
  WriteNewQuote,
  Posts,
  Loader,
} from 'components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useFeed } from 'hooks/useFeed';
import { FeedQuoteForm } from 'components/Quotes/FeedQuoteForm';
import { QuoteModal } from 'components/Quotes/QuoteModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import Head from 'next/head';

const Feed = () => {
  const {
    t,
    quoteCtx,
    quotes,
    setPage,
    page,
    total,
    setSearchQuery,
    currLang,
    userCtx,
  } = useFeed();

  return (
    <>
      <Head>
        <title>
          {currLang === 'en'
            ? 'News feed - Movie Quotes'
            : 'ნიუს ფიდი - Movie Quotes'}
        </title>
      </Head>
      {quoteCtx.quoteCreationModal && (
        <>
          <FeedBackdrop
            onClick={() => quoteCtx.quoteCreationStateHandler(false)}
            className='backdrop-blur-sm'
          />
          <QuoteModal title={t('quotes:addQtBtn')}>
            <FeedQuoteForm />
          </QuoteModal>
        </>
      )}
      {userCtx.loader ? (
        <>
          <Loader className='absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-50' />
          <FeedBackdrop
            onClick={() => {}}
            className=' bg-mainDark bg-opacity-100'
          />
        </>
      ) : (
        <FeedWrapper className='flex flex-col mt-10 md:mt-16 lg:mt-10 sm:px-[5%] lg:mr-[10%]'>
          <div className='flex lg:w-[85%] xl:w-[80%]'>
            <div className='flex items-center w-full gap-4 h-10'>
              <WriteNewQuote setSearchQuery={setSearchQuery} />
            </div>
          </div>
          <ul className='lg:w-[85%] xl:w-[80%]'>
            <InfiniteScroll
              dataLength={quotes.length}
              next={() => setPage(page + 1)}
              hasMore={total === quotes.length ? false : true}
              loader={
                <div className='flex flex-col items-center w-full mt-8'>
                  <div className='w-8 h-8 border-t-2 border-b-2 border-red rounded-full animate-spin'></div>
                </div>
              }
              endMessage={
                <p className='flex justify-center text-gray30 text-lg mt-6'>
                  <b>{t('quotes:endOfFeed')}</b>
                </p>
              }
            >
              {quotes.map((quote) => (
                <li key={quote._id} className='w-full'>
                  <Posts quote={quote} />
                </li>
              ))}
            </InfiniteScroll>
          </ul>
        </FeedWrapper>
      )}
    </>
  );
};

export default Feed;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'profile',
        'home',
        'genres',
        'movies',
        'quotes',
      ])),
    },
  };
};
