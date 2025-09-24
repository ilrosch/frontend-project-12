import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { sendMessage } from '../../api/chat';

export default function FormMessage({ activeChannel, username }) {
  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: async ({ message }) => {
      try {
        const msgData = { body: message, channelId: activeChannel.id, username };
        await sendMessage(msgData);
        formik.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Form className='d-flex gap-1 p-3 flex-shrink-0 mt-auto' onSubmit={formik.handleSubmit}>
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
