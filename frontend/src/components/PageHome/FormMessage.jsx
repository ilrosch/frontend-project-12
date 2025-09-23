import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';

export default function FormMessage() {
  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: async (values) => {
      console.log(values);
      formik.resetForm();
    },
  });

  return (
    <Form className='d-flex gap-1 p-3' onSubmit={formik.handleSubmit}>
      <Form.Control
        id='message'
        name='message'
        placeholder='Ваше сообщение...'
        value={formik.values.message}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Button variant='primary' type='submit' disabled={!formik.isValid || !formik.dirty}>
        Отправить
      </Button>
    </Form>
  );
}
