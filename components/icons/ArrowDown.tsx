import React from 'react';

const ArrowDown = () => {
  return (
    <svg
      width='16'
      height='10'
      viewBox='0 0 16 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_d_4412_32803)'>
        <path
          d='M0.000137329 0.5L8.00014 8.5L16 0.5L0.000137329 0.5Z'
          fill='white'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_4412_32803'
          x='0.00012207'
          y='0.5'
          width='15.9999'
          height='9.5'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='1.5' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_4412_32803'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_4412_32803'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};

export default ArrowDown;
