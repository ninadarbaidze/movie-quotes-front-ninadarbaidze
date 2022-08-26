import Image from 'next/image';
import { Comment, CommentItem, Like, CommentInput } from 'components';
import { usePosts } from './usePosts';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext, UserContext } from 'store';
import { useSession } from 'next-auth/react';
import { likePost } from 'services';

const Posts: React.FC<any> = (props) => {
  const { quote } = props;
  const {} = usePosts();
  const router = useRouter();
  const userCtx = useContext(UserContext);
  const { data: session } = useSession();
  const ctx = useContext(AuthContext);

  const myLoader = () => {
    return `${process.env.NEXT_PUBLIC_API_URL}/${userCtx.userState.profileImage}`;
  };
  const myLoader2 = () => {
    return `${process.env.NEXT_PUBLIC_API_URL}/${quote.image}`;
  };

  const likeHandler = async () => {
    let token = session ? session.accessToken : ctx.token;
    const userId: string | Blob | unknown = session
      ? session.userId
      : ctx.userId;
    const data = {
      userId: userId,
      quoteId: quote._id,
    };
    await likePost(data, token);
  };

  return (
    <div className='flex flex-col gap-3 w-[65%] mr-[20%] mt-4 h-full bg-mainDark rounded-[12px] px-[2%] '>
      <div className='flex items-center gap-2 pt-[2%]'>
        <div className='object-cover w-10 h-10 rounded-full overflow-clip border-2'>
          <Image
            loader={myLoader}
            src={`${process.env.NEXT_PUBLIC_API_URL}/${userCtx.userState.profileImage}`}
            alt='profile-icon'
            width={50}
            height={50}
          />
        </div>
        <div>
          <p className='text-white font-base'>{userCtx.userState.username}</p>
        </div>
      </div>
      <div className='flex gap-2 text-white'>
        <p className='text-white font-base'>
          {router.locale === 'ge' ? quote.quoteGE : quote.quoteEN}
        </p>
        <p>
          movie-
          <span className='text-beidge'>
            {quote.movieId[router.locale].movieName}.
          </span>
          <span>({quote.movieId.year})</span>
        </p>
      </div>
      <div className='flex overflow-clip w-full relative rounded-[10px] object-cover'>
        <Image
          loader={myLoader2}
          src={`${process.env.NEXT_PUBLIC_API_URL}/${quote.image}`}
          alt='imagePreview'
          objectFit='cover'
          width={'800px'}
          height={'500px'}
        />
      </div>
      <div className='flex items-center gap-4 text-white'>
        <button className='flex gap-1'>
          <p>{quote.comments.length}</p>
          <Comment />
        </button>
        <button className='flex gap-1' onClick={likeHandler}>
          <p>{quote.likes.length}</p>
          <Like />
        </button>
      </div>
      <div className='w-full h-[1px] bg-gray15 bg-opacity-30' />

      <ul>
        {quote.comments.map((comment) => (
          <li key={comment._id}>
            <CommentItem comment={comment} />
          </li>
        ))}
      </ul>
      <CommentInput quoteId={quote._id} />
    </div>
  );
};

export default Posts;