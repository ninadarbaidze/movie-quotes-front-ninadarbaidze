import React from 'react';
import Image from 'next/image';
import { Liked, QuoteIcon } from 'components/icons';
import { useNotificationItem } from './useNotificationItem';
import { format } from 'timeago.js';
import { NotificationItemTypes } from './types';

const NotificationItem: React.FC<NotificationItemTypes> = (props) => {
  const { notificationData, className } = props;
  const { t, liked, myLoader, isRead, notificationRedirectHandler } =
    useNotificationItem({ notificationData });
  return (
    <div className={`${className}`}>
      <div
        className='flex items-center justify-between p-2 border-[1px] border-opacity-50 border-gray20 rounded w-full h-20 cursor-pointer hover:border-green transition-all duration-500'
        onClick={() => notificationRedirectHandler()}
      >
        <div className='flex items-center gap-2'>
          <div
            className={`w-12 h-12 rounded-full overflow-clip border-2 ${
              isRead ? 'border-mainDark2' : 'border-green'
            }`}
          >
            <div className='object-cover'>
              <Image
                loader={myLoader}
                src={`${process.env.NEXT_PUBLIC_API_URL}/${notificationData.senderId.profileImage}`}
                alt='profile-icon'
                width={50}
                height={50}
                objectFit='cover'
              />
            </div>
          </div>
          <div className='text-white text-base w-[12rem] sm:w-[15rem]'>
            <h3>{notificationData.senderId.username}</h3>
            <div className='flex gap-2 items-center w-[90%] sm:w-full'>
              {liked ? <Liked /> : <QuoteIcon className='w-[18px]' />}
              <p className='text-sm text-gray10 truncate w-[100%]'>
                {liked ? `${t('quotes:reacted')}` : `${t('quotes:commented')}`}
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-end '>
          <p className='text-darkWhite text-xs text-right sm:text-sm'>
            {format(notificationData.createdAt)}
          </p>
          {!isRead && <p className='text-green text-sm'>{t('quotes:new')}</p>}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
