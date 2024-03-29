import { Trash } from 'components';
import React from 'react';
import {
  MovieTextArea,
  QuoteImageEditInput,
  Button,
  FeedBackdrop,
  DeleteQuoteModal,
  QuoteModal,
} from 'components';
import { FormikProps, Form, Field, ErrorMessage, Formik } from 'formik';
import { quoteSchema } from 'schema';
import { QuoteDefaultValues } from './types';
import { useEditQuoteModal } from './useEditQuoteModal';

const EditQuoteModal = () => {
  const { onSubmit, t, defaultValues, quoteCtx, deleteModal, setDeleteModal } =
    useEditQuoteModal();

  const renderForm: React.FC<FormikProps<QuoteDefaultValues>> = () => (
    <div>
      <FeedBackdrop
        onClick={() => quoteCtx.editQuoteHandler(false)}
        className='backdrop-blur-sm'
      />
      <QuoteModal title={t('quotes:editQt')}>
        {deleteModal && <DeleteQuoteModal setDeleteModal={setDeleteModal} />}
        <button
          className='flex gap-2 px-[4%] pt-5 absolute top-0 left-0'
          onClick={() => setDeleteModal(true)}
        >
          <Trash />
          <p className='text-white text-sm'>{t('quotes:delete')}</p>
        </button>
        <div className='flex flex-col gap-4'>
          <Form className='flex flex-col h-full lg:min-h-[60vh] overflow-auto'>
            <div className='flex flex-col gap-10'>
              <Field
                name='quoteEN'
                component={MovieTextArea}
                placeholder='Start create new quote'
                lang={'Eng'}
                className='placeholder:italic placeholder:text-gray text-white'
              />
              <ErrorMessage name='quoteEN'>
                {(msg) => (
                  <div className='mt-[-1rem] mb-[-2rem] text-red text-xs pl-3'>
                    {`${t(`${msg}`)}`}
                  </div>
                )}
              </ErrorMessage>
              <Field
                name='quoteGE'
                component={MovieTextArea}
                placeholder='ახალი ციტატა'
                lang={'ქარ'}
                className='placeholder:italic placeholder:text-gray text-white'
              />
              <ErrorMessage name='quoteGE'>
                {(msg) => (
                  <div className='mt-[-1rem] mb-[-2.5rem] text-red text-xs pl-3'>
                    {`${t(`${msg}`)}`}
                  </div>
                )}
              </ErrorMessage>
              <Field
                type='file'
                name='image'
                accept='image/*'
                component={QuoteImageEditInput}
              />
              <ErrorMessage name='image'>
                {(msg) => (
                  <div className='mt-[-2rem] mb-[-0.5rem] text-red text-xs pl-3'>
                    {`${t(`${msg}`)}`}
                  </div>
                )}
              </ErrorMessage>
            </div>
            <Button
              text={t('quotes:saveBtn')}
              className='bg-red mt-6 mb-10 w-[100%]'
            />
          </Form>
        </div>
      </QuoteModal>
    </div>
  );

  return (
    <Formik
      initialValues={defaultValues}
      render={renderForm}
      onSubmit={onSubmit}
      validationSchema={quoteSchema}
    />
  );
};

export default EditQuoteModal;
