import { InputTypes } from './types';
import { HidePassword, ShowPassword, DeleteIcon } from 'components';
import useInput from './useInput';

const Input: React.FC<InputTypes> = (props) => {
  const { showPassword, showHidePassHandler } = useInput();

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
    deleteInput,
    disabled,
    onClick,
  } = props;

  const passwordField = type === 'password';
  const inputType = passwordField
    ? !showPassword
      ? 'password'
      : 'text'
    : type;

  const deleteInputHandler = () => {
    (document.getElementById(`${id}`) as HTMLInputElement)!.value = '';
  };

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
          disabled={disabled ? true : false}
          onClick={onClick}
          className={`${className} py-2 text-black placeholder:text-gray20  pl-3 w-[100%] bg-gray10 rounded-[4px] px-12 truncate`}
        />
        {passwordField ? (
          showPassword ? (
            <div
              onClick={showHidePassHandler}
              className={'absolute ml-[90%] cursor-pointer'}
            >
              <ShowPassword />
            </div>
          ) : (
            <div
              onClick={showHidePassHandler}
              className={'absolute ml-[90%] cursor-pointer'}
            >
              <HidePassword />
            </div>
          )
        ) : (
          ''
        )}
        {deleteInput && (
          <div
            onClick={deleteInputHandler}
            className='absolute ml-[92%] cursor-pointer'
          >
            <DeleteIcon />
          </div>
        )}
      </div>

      <div className='flex gap-3'>
        {isTouched && errorMessage ? (
          <p className='text-red text-xs mt-1'>{errorMessage}</p>
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
