import React from 'react';

const Dialog = () => {
  return (
    <div className='flex md:w-[25%] h-48 bg-profileDialog bg-mainDark fixed  top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-[12px]  z-40'>
      <div className='flex flex-col justify-between items-center w-full mb-2 '>
        <h1 className='text-md text-left text-white font-helvetica_ge font-thin px-4 pt-12'>
          Are you sure to make changes ?
        </h1>
        <div className=' border-t-[1px] w-full border-gray15 border-opacity-20'>
          <div className='flex justify-between items-center py-4 px-8'>
            <p className='text-gray10 cursor-pointer'>Cancel</p>
            <button className='bg-red hover:bg-redHover text-white transition duration-300 font-helvetica_ge font-thin text-base rounded-[4px] px-2 py-1'>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;