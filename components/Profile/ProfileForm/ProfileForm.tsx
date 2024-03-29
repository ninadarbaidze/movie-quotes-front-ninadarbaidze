import { useProfileForm } from './useProfileForm';
import { ProfileFormTypes } from './types';
import {
  ProfileInput,
  Button,
  EmailItem,
  FeedButton,
  FeedBackdrop,
  ProfileModal,
  Loader,
} from 'components';
import { ChevronDownIcon } from '@heroicons/react/solid';

const ProfileForm: React.FC<ProfileFormTypes> = (props) => {
  const { imageChangeHandler, emailList, setEmailList, customLoader } = props;
  const {
    t,
    formik,
    fileRef,
    changeHandler,
    editPassword,
    setEditPassword,
    userCtx,
    error,
    onDeleteMail,
    onMakePrimary,
    cancelPasswordEditHandler,
    emailEdit,
    setEmailEdit,
  } = useProfileForm({ emailList, setEmailList });

  return (
    <>
      {userCtx.formModal && (
        <>
          <FeedBackdrop
            className={`${
              userCtx.formModal && !userCtx.dialog
                ? 'backdrop-blur-0 bg-opacity-0 md:backdrop-blur-sm md:bg-opacity-20'
                : 'backdrop-blur-sm'
            }`}
            onClick={() => {
              userCtx.setFormModal(false);
              userCtx.setDialog(false);
            }}
          />
          <ProfileModal
            label={
              userCtx.editInputState === 'username'
                ? `${t('profile:newUsername')}`
                : `${t('profile:newEmail')}`
            }
            placeholder={
              userCtx.editInputState === 'username'
                ? `${t('profile:enterNewUsername')}`
                : `${t('profile:enterNewEmail')}`
            }
            name={userCtx.editInputState === 'username' ? 'username' : 'email'}
            title={
              userCtx.editInputState === 'username'
                ? `${t('profile:addNewUserName')}`
                : `${t('profile:addNewEmail')}`
            }
            setEmailList={setEmailList}
            emailList={emailList}
          />
        </>
      )}

      <form
        onSubmit={formik.handleSubmit}
        encType='multipart/form-data'
        className={`${userCtx.formModal && 'hidden md:block'}`}
      >
        <p
          className={` ${
            userCtx.emailSection || userCtx.passwordSection
              ? 'hidden md:block'
              : 'block'
          } text-white text-center text-md z-50 pt-60 md:pt-28 cursor-pointer`}
          onClick={() => fileRef.current!.click()}
        >
          {t('profile:upload')}
        </p>
        <div className='flex justify-center gap-6 pt-0 md:pt-6 px-[5%] pb-12 w-[100%]'>
          <div className=''>
            {customLoader ? (
              <Loader className='mt-24' />
            ) : (
              <>
                <input
                  type='file'
                  name='image'
                  ref={fileRef}
                  accept='image/*'
                  hidden
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    changeHandler(e, imageChangeHandler)
                  }
                />
                <div
                  className={`${
                    userCtx.emailSection || userCtx.passwordSection
                      ? 'hidden md:flex'
                      : 'flex'
                  } justify-start gap-4 w-full xs:border-b-[1px] border-gray10 border-opacity-50 md:border-0`}
                >
                  <div>
                    <ProfileInput
                      name={'username'}
                      label={t('profile:username')}
                      type={'text'}
                      id={'username'}
                      placeholder={t('profile:usernamePlaceholder')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isTouched={formik.touched.username}
                      value={formik.values.username}
                      errorMessage={formik.errors.username!}
                      disabled={true}
                      error={error}
                      errorMsg={`${t('home:userExists')}`}
                      className='bg-transparent md:bg-gray10 text-white md:text-black'
                    />
                    <div className='xs:hidden md:block w-full h-[1px] bg-gray20 bg-opacity-30 mt-4' />
                  </div>

                  <p
                    className='text-gray10 text-sm mt-[4.5rem] cursor-pointer'
                    onClick={() => {
                      userCtx.setEditInputState('username');
                      userCtx.setFormModal(true);
                    }}
                  >
                    {t('profile:edit')}
                  </p>
                </div>
                <div
                  className={`${
                    userCtx.emailSection ? 'block' : 'hidden md:block'
                  } `}
                >
                  <ul>
                    {emailList
                      .sort(
                        (a, b) => (a.primary < b.primary) as unknown as number
                      )
                      .map((email) => (
                        <li key={email._id}>
                          {email.primary && (
                            <p className='md:hidden text-white mt-4 text-sm'>
                              {t('profile:primaryEmail')}
                            </p>
                          )}

                          <EmailItem
                            {...email}
                            key={email._id}
                            setEmailList={setEmailList}
                            onDeleteMail={onDeleteMail}
                            onMakePrimary={onMakePrimary}
                            setEmailEdit={setEmailEdit}
                          />
                        </li>
                      ))}
                  </ul>
                  {error?.includes('Email') &&
                    error &&
                    userCtx.profileEditMode &&
                    !emailEdit && (
                      <p className='text-red text-xs mt-4'>
                        {t('profile:emailTakenError')}
                      </p>
                    )}
                  {userCtx.emailSection && (
                    <p className='md:hidden text-white mt-4 text-sm'>
                      {t('profile:addEmail')}
                    </p>
                  )}
                  <FeedButton
                    text={`${t('profile:addNewEmail')}`}
                    type='button'
                    className='flex justify-center bg-transparent border-[1px] border-white mt-12 w-full md:w-72 text-xs text-center hover:border-red'
                    onClick={() => {
                      userCtx.setEditInputState('email');
                      userCtx.setFormModal(true);
                    }}
                  />
                </div>

                <div
                  className={` ${
                    userCtx.emailSection || userCtx.passwordSection
                      ? 'hidden md:flex'
                      : 'flex'
                  } justify-start items-center gap-4 w-full xs:border-b-[1px] border-gray10 border-opacity-50 md:border-0`}
                >
                  <div>
                    <div className='xs:hidden md:block w-full h-[1px] bg-gray20 bg-opacity-30 mt-12 ' />

                    <ProfileInput
                      id='password'
                      name='password'
                      type='password'
                      label={t('home:inputPassword')}
                      placeholder={t('home:passwordPlaceholder')}
                      value={userCtx.userState.password}
                      className=' bg-transparent md:bg-gray10 text-white md:text-black'
                      disabled={true}
                      disablePassword={true}
                    />
                  </div>

                  {!editPassword && (
                    <p
                      className='text-gray10 text-sm mt-[2rem] md:mt-[5.5rem] cursor-pointer'
                      onClick={() => {
                        setEditPassword(true);
                        userCtx.setPasswordSection(true);
                      }}
                    >
                      {t('profile:edit')}
                    </p>
                  )}
                </div>

                {editPassword && userCtx.passwordSection && (
                  <>
                    <div className='flex bg-mainDark w-full xs:mt-12 md:mt-0'>
                      <div className='flex flex-col justify-center gap-1  text-xs border-[1px] border-gray10 border-opacity-20 rounded py-4 pl-4 xs:w-full  md:mr-48 lg:mr-74 h-full'>
                        <h4 className='text-sm text-white'>
                          {t('profile:passwordSectionH')}
                        </h4>
                        <div className='flex items-center gap-1'>
                          <div
                            className={`rounded-full text-white w-1 h-1 ${
                              formik.errors.newPassword?.includes('8')
                                ? 'bg-gray25'
                                : 'bg-green'
                            } `}
                          />
                          <p
                            className={` text-white ${
                              formik.errors.newPassword?.includes('8')
                                ? 'text-gray25'
                                : 'text-white'
                            } `}
                          >
                            {t('profile:8orMore')}
                          </p>
                        </div>
                        <div className='flex items-center gap-1'>
                          <div
                            className={`rounded-full text-white w-1 h-1 ${
                              formik.errors.newPassword?.includes('15')
                                ? 'bg-gray25'
                                : 'bg-green'
                            } `}
                          />
                          <p
                            className={`${
                              formik.errors.newPassword?.includes('15')
                                ? 'text-gray25'
                                : 'text-white'
                            } `}
                          >
                            {t('profile:15orLess')}
                          </p>
                        </div>
                        <div className='flex items-center gap-1'>
                          <div
                            className={`rounded-full text-white w-1 h-1 ${
                              formik.errors.newPassword?.includes('valid')
                                ? 'bg-gray25'
                                : 'bg-green'
                            } `}
                          />
                          <p
                            className={`${
                              formik.errors.newPassword?.includes('valid')
                                ? 'text-gray25'
                                : 'text-white'
                            } `}
                          >
                            {t('profile:lowerCase')}
                          </p>
                        </div>
                        <div className='flex items-center gap-1'>
                          <div
                            className={`rounded-full text-white w-1 h-1 ${
                              formik.errors.repeatPassword?.includes('match')
                                ? 'bg-gray25'
                                : 'bg-green'
                            } `}
                          />
                          <p
                            className={`${
                              formik.errors.repeatPassword?.includes('match')
                                ? 'text-gray25'
                                : 'text-white'
                            } `}
                          >
                            {t('profile:match')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-start items-center gap-4 w-full'>
                      <div>
                        <ProfileInput
                          id='newPassword'
                          name='newPassword'
                          type='password'
                          label={t('profile:newPassword')}
                          placeholder={t('profile:newPassword')}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isTouched={formik.touched.newPassword}
                          value={formik.values.newPassword}
                          errorMessage={formik.errors.newPassword!}
                          className='px-48  bg-gray10 text-black'
                        />
                      </div>
                    </div>

                    <div className='flex justify-start items-center gap-4 w-full'>
                      <div>
                        <ProfileInput
                          id='repPassword'
                          name='repeatPassword'
                          type='password'
                          label={t('home:inputConfirmPass')}
                          placeholder={t('home:confirmPassPlaceholder')}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isTouched={formik.touched.repeatPassword}
                          value={formik.values.repeatPassword}
                          errorMessage={formik.errors.repeatPassword!}
                          className='px-48  bg-gray10 text-black'
                        />
                      </div>
                    </div>

                    <div className='flex md:hidden justify-between items-center py-4 '>
                      <p
                        className='text-gray10 cursor-pointer'
                        onClick={() => cancelPasswordEditHandler()}
                      >
                        {t('profile:cancel')}
                      </p>
                      <button
                        type='button'
                        className='bg-red hover:bg-redHover text-white transition duration-300 font-helvetica_ge font-thin text-base rounded-[4px] px-3 py-1'
                        onClick={() => {
                          userCtx.setDialog(true);
                        }}
                      >
                        {t('profile:add')}
                      </button>
                    </div>
                  </>
                )}
                <div
                  className={` ${
                    userCtx.emailSection || userCtx.passwordSection
                      ? 'hidden md:hidden'
                      : 'flex md:hidden'
                  } md:hidden flex justify-between mt-8 cursor-pointer`}
                  onClick={() => userCtx.setEmailSection(true)}
                >
                  <h3 className='text-white'>{t('profile:emailSectionH')}</h3>
                  <ChevronDownIcon className=' -rotate-90 text-white w-6' />
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className={`${
            userCtx.passwordSection || userCtx.emailSection
              ? 'hidden md:block'
              : 'block'
          } absolute left-[50%] translate-x-[-50%] lg:translate-x-0 lg:left-[calc(100%_-_10rem)]`}
        >
          {userCtx.profileEditMode && (
            <Button
              text={t('profile:saveBtn')}
              type='submit'
              className='bg-red hover:bg-redHover w-[10rem] mt-12 h-12 text-base'
            />
          )}
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
