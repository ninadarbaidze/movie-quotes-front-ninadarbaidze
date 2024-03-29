import { InputTypes } from './types';
import { Success, Fail, HidePassword, ShowPassword } from 'components';
import useInput from './useInput';

const Input: React.FC<InputTypes> = (props) => {
  const { showPassword, showHidePassHandler, t } = useInput();

  let {
    name,
    label,
    className,
    type,
    id,
    placeholder,
    onChange,
    value,
    errorMessage,
    onBlur,
    isTouched,
    error,
    errorMsg,
  } = props;

  const passwordField = type === 'password';
  const inputType = passwordField
    ? !showPassword
      ? 'password'
      : 'text'
    : type;

  return (
    <div className='h-[6rem]'>
      <div className='flex gap-2 mb-2 mt-8'>
        <label htmlFor='username' className='text-white'>
          {label}
        </label>
      </div>
      <div className='flex items-center relative'>
        <input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          className={`${className} py-2 text-black placeholder:text-gray20  pl-2 w-[100%] bg-gray10 rounded-[4px] ${
            (isTouched && errorMessage) || (isTouched && error)
              ? 'border-[2px] border-red px-20'
              : 'px-12'
          } ${
            isTouched && !errorMessage && isTouched && !error
              ? 'border-[2px] border-green px-20'
              : 'px-12'
          }  truncate`}
        />
        {passwordField ? (
          showPassword ? (
            <div
              onClick={showHidePassHandler}
              className={`absolute ${
                isTouched ? 'right-9' : 'right-4'
              } cursor-pointer`}
            >
              <ShowPassword />
            </div>
          ) : (
            <div
              onClick={showHidePassHandler}
              className={`absolute ${
                isTouched ? 'right-9' : 'right-4'
              } cursor-pointer`}
            >
              <HidePassword />
            </div>
          )
        ) : (
          ''
        )}
        {((isTouched && errorMessage) || (isTouched && error)) && (
          <Fail className='absolute  right-4' />
        )}
        {isTouched && !errorMessage && isTouched && !error && (
          <Success className='absolute  right-4' />
        )}
      </div>

      <div className='flex gap-3'>
        {isTouched && errorMessage ? (
          <p className='text-red text-xs mt-1'>{`${t(`${errorMessage}`)}`}</p>
        ) : (
          ''
        )}
        {error && errorMessage ? (
          <p className='text-red text-xs mt-1'> | </p>
        ) : (
          ''
        )}
        {error ? <p className='text-red text-xs mt-1'>{errorMsg}</p> : ''}
      </div>
    </div>
  );
};

export default Input;
