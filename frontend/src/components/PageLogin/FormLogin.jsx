import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Минимум 2 символа!')
    .max(50, 'Максимум 50 символов!')
    .required('Обязательное поле!'),
  password: yup.string().required('Обязательное поле!'),
});

export default function FormLogin() {
  const formik = useFormik({
    initialValues: { name: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Form className='mb-2' onSubmit={formik.handleSubmit} noValidate>
      <Form.FloatingLabel controlId='name' label='Ваш ник' className='mb-2'>
        <Form.Control
          type='text'
          name='name'
          placeholder='Ваш ник'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          isInvalid={formik.touched.name && !!formik.errors.name}
        />
        <Form.Control.Feedback type='invalid'>
          {formik.touched.name && formik.errors.name}
        </Form.Control.Feedback>
      </Form.FloatingLabel>

      <Form.FloatingLabel controlId='password' label='Ваш пароль' className='mb-4'>
        <Form.Control
          type='password'
          name='password'
          placeholder='Ваш пароль'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isInvalid={formik.touched.password && !!formik.errors.password}
        />
        <Form.Control.Feedback type='invalid'>
          {formik.touched.password && formik.errors.password}
        </Form.Control.Feedback>
      </Form.FloatingLabel>

      <Button type='submit' variant='primary' size='lg' disabled={!formik.isValid || !formik.dirty}>
        Войти
      </Button>
    </Form>
  );
}
