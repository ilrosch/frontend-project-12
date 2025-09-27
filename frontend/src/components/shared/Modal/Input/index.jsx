import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { selectChannelById } from '../../../../store/slices/channel';
import changeDisabledButton from '../../../../utils/changeDisabledButton';
import { useTranslation } from 'react-i18next';

export default function InputModal({
  title,
  label,
  channelId = '',
  close,
  schema,
  handleSubmit,
  handleSetActiveChannel,
}) {
  const { t } = useTranslation();

  const inputElement = useRef(null);
  const buttonElement = useRef(null);

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  const initValue = useSelector((state) =>
    channelId ? selectChannelById(state, channelId).name : '',
  );

  const formik = useFormik({
    initialValues: { value: initValue },
    validationSchema: schema,
    onSubmit: ({ value }) => {
      changeDisabledButton(buttonElement.current);
      handleSubmit(value, channelId)
        .then((channel) => {
          close();
          handleSetActiveChannel(channel)();
        })
        .finally(() => changeDisabledButton(buttonElement.current));
    },
  });

  return (
    <Modal show onHide={close}>
      <Modal.Header>
        <Modal.Title>{t(title)}</Modal.Title>
        <Button variant='close' onClick={close} />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Form.FloatingLabel controlId='value' label={t(label)} className='mb-2'>
            <Form.Control
              ref={inputElement}
              name='value'
              placeholder={t(label)}
              value={formik.values.value}
              onBlur={(e) => {
                formik.setFieldValue(name, e.target.value.trim());
                formik.handleBlur(e);
              }}
              onChange={formik.handleChange}
              isInvalid={formik.touched.value && !!formik.errors.value}
            />
            <Form.Control.Feedback type='invalid'>
              {formik.touched.value && formik.errors.value}
            </Form.Control.Feedback>
          </Form.FloatingLabel>
          <div className='d-flex justify-content-end gap-2'>
            <Button variant='secondary' onClick={close}>
              {t('element.button.cancel')}
            </Button>
            <Button
              ref={buttonElement}
              type='submit'
              variant='primary'
              disabled={!formik.isValid || !formik.dirty}
            >
              {t('element.button.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
