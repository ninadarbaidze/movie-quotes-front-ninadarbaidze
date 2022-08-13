import { Field, Form, Formik } from 'formik';
import {
  SelectInput,
  MovieInput,
  MovieTextArea,
  Button,
  ImageInput,
} from 'components';
import { useMovieForm } from './useMovieForm';

const MovieForm = () => {
  const { genres, onSubmit, defaultValues } = useMovieForm();

  const renderForm = () => (
    <Form className='flex flex-col gap-5'>
      <Field
        name='movieNameEN'
        options={genres}
        component={MovieInput}
        placeholder='Movie name'
        isMulti={true}
        lang={'Eng'}
      />
      <Field
        name='movieNameGE'
        options={genres}
        component={MovieInput}
        placeholder='ფილმის სახელი'
        isMulti={true}
      />
      <Field
        name='genre'
        options={genres}
        component={SelectInput}
        placeholder='Genre'
        isMulti={true}
      />
      <Field
        name='directorEN'
        options={genres}
        component={MovieInput}
        placeholder='Director'
        isMulti={true}
        lang={'Eng'}
      />
      <Field
        name='directorGE'
        options={genres}
        component={MovieInput}
        placeholder='რეჟისორი'
        isMulti={true}
      />
      <Field
        name='budget'
        options={genres}
        component={MovieInput}
        placeholder='Budget'
        type='number'
        isMulti={true}
        className='appearance-none'
      />
      <Field
        name='descriptionEN'
        options={genres}
        component={MovieTextArea}
        placeholder='Movie discription'
        isMulti={true}
        lang={'Eng'}
      />
      <Field
        name='descriptionGE'
        options={genres}
        component={MovieTextArea}
        placeholder='ფილმის აღწერა'
        isMulti={true}
        lang={'ქარ'}
      />
      <Field type='file' name='image' accept='image/*' component={ImageInput} />

      <Button text={'Add movie'} className='bg-red mt-2 mb-10 w-[100%]' />
    </Form>
  );

  return (
    <Formik
      initialValues={defaultValues}
      render={renderForm}
      onSubmit={onSubmit}
    />
  );
};

export default MovieForm;
