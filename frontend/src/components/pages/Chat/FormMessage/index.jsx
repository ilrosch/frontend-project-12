import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import changeDisabledButton from '../../../../utils/changeDisabledButton';
import handleApi from '../../../../api';
import { useTranslation } from 'react-i18next';
import filterWords from '../../../../utils/filterWord';
import { createToastError } from '../../../../utils/toast';

export default function FormMessage({ activeChannel, username }) {
  const { t } = useTranslation();
  const inputElement = useRef(null);
  const buttonElement = useRef(null);

  useEffect(() => {
    inputElement.current.focus();
  }, [activeChannel]);

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: async ({ message }) => {
      try {
        changeDisabledButton(buttonElement.current);
        const msgData = { body: filterWords(message), channelId: activeChannel.id, username };
        await handleApi.message.add(msgData);
        formik.resetForm();
      } catch (err) {
        createToastError(t(err));
      } finally {
        changeDisabledButton(buttonElement.current);
      }
    },
  });

  return (
    <Form className='d-flex gap-1 p-3 flex-shrink-0 mt-auto' onSubmit={formik.handleSubmit}>
      <Form.Control
        ref={inputElement}
        id='message'
        name='message'
        placeholder={t('chat.form.message')}
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
        {t('element.button.send')}
      </Button>
    </Form>
  );
}
