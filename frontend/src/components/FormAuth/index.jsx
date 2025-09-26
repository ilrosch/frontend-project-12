import { Alert, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { setCredential } from '../../services/slices/authSlice';
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import { changeDisabledButton } from '../../utils';

export default function FormAuth({ fields = [], buttonText = '', schema, handleSubmit }) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const buttonElement = useRef(null);

  const formik = useFormik({
    initialValues: fields.reduce((acc, { name }) => ({ ...acc, [name]: '' }), {}),
    validationSchema: schema,
    onSubmit: async (values) => {
      const normalData = Object.entries(values).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

      try {
        changeDisabledButton(buttonElement.current);
        const resData = await handleSubmit(normalData);
        localStorage.setItem('user', JSON.stringify(resData));
        dispatch(setCredential(resData));
        navigation('/', { replace: true });
      } catch (err) {
        formik.setFieldError('submit', err.message);
      } finally {
        changeDisabledButton(buttonElement.current);
      }
    },
  });

  return (
    <Form className='mb-2' onSubmit={formik.handleSubmit} noValidate>
      {fields.map(({ name, label, type }) => (
        <Form.FloatingLabel key={name} controlId={name} label={label} className='mb-2'>
          <Form.Control
            type={type}
            name={name}
            placeholder={label}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[name]}
            isInvalid={formik.touched[name] && !!formik.errors[name]}
            autoComplete='on'
          />
          <Form.Control.Feedback type='invalid'>
            {formik.touched[name] && formik.errors[name]}
          </Form.Control.Feedback>
        </Form.FloatingLabel>
      ))}

      <Button
        ref={buttonElement}
        type='submit'
        variant='primary'
        size='lg'
        className='mt-3'
        disabled={!formik.isValid || !formik.dirty}
      >
        {buttonText}
      </Button>

      {formik.errors.submit && (
        <Alert variant='danger' className='mt-3'>
          {formik.errors.submit}
        </Alert>
      )}
    </Form>
  );
}
