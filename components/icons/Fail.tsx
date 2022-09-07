import React from 'react';
import { ClassName } from 'types';

const Fail: React.FC<ClassName> = (props) => {
  const { className } = props;
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.75 8C0.75 3.99594 3.99594 0.75 8 0.75C12.0041 0.75 15.25 3.99594 15.25 8C15.25 12.0041 12.0041 15.25 8 15.25C3.99594 15.25 0.75 12.0041 0.75 8ZM7.33449 4.05883C7.42905 3.95752 7.56142 3.9 7.7 3.9H8.3C8.43858 3.9 8.57095 3.95752 8.66551 4.05883C8.76008 4.16013 8.80835 4.29614 8.79881 4.4344L8.49882 8.7844C8.48073 9.04657 8.26279 9.25 8 9.25C7.73721 9.25 7.51927 9.04657 7.50118 8.7844L7.20118 4.4344C7.19165 4.29614 7.23992 4.16013 7.33449 4.05883ZM8.9 11.3C8.9 11.7971 8.49706 12.2 8 12.2C7.50294 12.2 7.1 11.7971 7.1 11.3C7.1 10.8029 7.50294 10.4 8 10.4C8.49706 10.4 8.9 10.8029 8.9 11.3Z'
        fill='#E31221'
      />
    </svg>
  );
};

export default Fail;
