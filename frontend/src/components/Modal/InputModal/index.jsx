import { useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { selectChannelById } from '../../../services/slices/channelSlice';
import { useEffect, useRef } from 'react';
import { changeDisabledButton } from '../../../utils';

export default function InputModal({
  title,
  label,
  channelId = '',
  close,
  schema,
  handleSubmit,
  handleSetActiveChannel,
}) {
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
          console.log(channel);
          handleSetActiveChannel(channel)();
        })
        .finally(() => changeDisabledButton(buttonElement.current));
    },
  });

  return (
    <Modal show onHide={close}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        <Button variant='close' onClick={close} />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Form.FloatingLabel controlId='value' label={label} className='mb-2'>
            <Form.Control
              ref={inputElement}
              name='value'
              placeholder={label}
              value={formik.values.value}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              isInvalid={formik.touched.value && !!formik.errors.value}
            />
            <Form.Control.Feedback type='invalid'>
              {formik.touched.value && formik.errors.value}
            </Form.Control.Feedback>
          </Form.FloatingLabel>
          <div className='d-flex justify-content-end gap-2'>
            <Button variant='secondary' onClick={close}>
              Отменить
            </Button>
            <Button
              ref={buttonElement}
              type='submit'
              variant='primary'
              disabled={!formik.isValid || !formik.dirty}
            >
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
