import React from 'react';
import { ClassName } from 'types';

const NotVerified: React.FC<ClassName> = (props) => {
  const { className } = props;
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7 14C8.85652 14 10.637 13.2625 11.9497 11.9497C13.2625 10.637 14 8.85652 14 7C14 5.14348 13.2625 3.36301 11.9497 2.05025C10.637 0.737498 8.85652 0 7 0C5.14348 0 3.36301 0.737498 2.05025 2.05025C0.737498 3.36301 0 5.14348 0 7C0 8.85652 0.737498 10.637 2.05025 11.9497C3.36301 13.2625 5.14348 14 7 14ZM7.81375 5.7645L6.93875 9.88138C6.8775 10.1789 6.96413 10.3477 7.20475 10.3477C7.3745 10.3477 7.63088 10.2865 7.805 10.1325L7.728 10.4965C7.47687 10.7993 6.923 11.0197 6.44613 11.0197C5.831 11.0197 5.56938 10.6505 5.73913 9.86562L6.38487 6.83113C6.44088 6.57475 6.39013 6.482 6.13375 6.41988L5.73913 6.349L5.81087 6.01562L7.81462 5.7645H7.81375ZM7 4.8125C6.76794 4.8125 6.54538 4.72031 6.38128 4.55622C6.21719 4.39212 6.125 4.16956 6.125 3.9375C6.125 3.70544 6.21719 3.48288 6.38128 3.31878C6.54538 3.15469 6.76794 3.0625 7 3.0625C7.23206 3.0625 7.45462 3.15469 7.61872 3.31878C7.78281 3.48288 7.875 3.70544 7.875 3.9375C7.875 4.16956 7.78281 4.39212 7.61872 4.55622C7.45462 4.72031 7.23206 4.8125 7 4.8125Z'
        fill={`${className}`}
      />
    </svg>
  );
};

export default NotVerified;
