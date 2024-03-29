import { FormValues } from './types';
import { FieldProps } from 'formik';
import { InputHTMLAttributes } from 'react';

const MovieTextArea: React.FC<
  FormValues & FieldProps & InputHTMLAttributes<HTMLTextAreaElement>
> = ({ field, form: { touched, errors }, ...props }) => {
  let { className, lang } = props;

  return (
    <div>
      <div className='flex h-3' />
      <div className='flex items-center relative'>
        <textarea
          {...props}
          {...field}
          className={`${className} ${
            touched[field.name] && errors[field.name]
              ? 'border-[1px] border-red px-20'
              : 'border-[1px]  border-gray20'
          } py-1 placeholder:text-gray20 text-white  pl-3 w-[100%] bg-mainDark break-all  rounded-[4px] px-12 `}
        />
        {lang === 'Eng' ? (
          <p className='absolute right-4 cursor-pointer text-gray20'>Eng</p>
        ) : (
          <p className='absolute right-4 cursor-pointer text-gray20'>ქარ</p>
        )}
      </div>
    </div>
  );
};

export default MovieTextArea;
