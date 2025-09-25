import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { sendMessage } from '../../api/chat';
import { useEffect, useRef } from 'react';
import { changeDisabledButton } from '../../utils';

export default function FormMessage({ activeChannel, username }) {
  const inputElement = useRef(null);
  const buttonElement = useRef(null);

  useEffect(() => {
    inputElement.current.focus();
  }, [activeChannel]);

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: async ({ message }) => {
      changeDisabledButton(buttonElement.current);

      try {
        const msgData = { body: message, channelId: activeChannel.id, username };
        await sendMessage(msgData);

        formik.resetForm();
      } catch (err) {
        console.log(err);
      }

      changeDisabledButton(buttonElement.current);
    },
  });

  return (
    <Form className='d-flex gap-1 p-3 flex-shrink-0 mt-auto' onSubmit={formik.handleSubmit}>
      <Form.Control
        ref={inputElement}
        id='message'
        name='message'
        placeholder='Ваше сообщение...'
        value={formik.values.message}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Button
        ref={buttonElement}
        variant='primary'
        type='submit'
        disabled={!formik.isValid || !formik.dirty}
      >
        Отправить
      </Button>
    </Form>
  );
}
