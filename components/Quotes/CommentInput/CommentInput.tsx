import { useCommentInput } from './useCommentInput';
import Image from 'next/image';
import { CommentInputTypes } from './types';

const CommentInput: React.FC<CommentInputTypes> = (props) => {
  const { quoteId, commentRef } = props;
  const { t, formik, userCtx, myLoader } = useCommentInput({ quoteId });

  return (
    <div className='flex justify-center gap-3 mt-3'>
      <div>
        <div className='object-cover w-10 h-10 rounded-full overflow-clip border-2'>
          <Image
            loader={myLoader}
            src={`${process.env.NEXT_PUBLIC_API_URL}/${userCtx.userState.profileImage}`}
            alt='profile-icon'
            width={50}
            height={50}
            objectFit='cover'
          />
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className='w-full mb-6 '>
        <input
          id='comment'
          name='comment'
          type='text'
          ref={commentRef}
          placeholder={t('quotes:comment')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.comment}
          className='w-[100%] py-2 text-white placeholder:text-gray10 text-sm  pl-5 bg-gray50 rounded-[10px] truncate'
        />
      </form>
    </div>
  );
};

export default CommentInput;
