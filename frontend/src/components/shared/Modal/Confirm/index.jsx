import { Button, Modal } from 'react-bootstrap';

export default function ConfirmModal({
  close,
  handleRemove,
  title = 'Удалить',
  text = 'Уверены?',
}) {
  return (
    <Modal show onHide={close}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        <Button variant='close' onClick={close} />
      </Modal.Header>
      <Modal.Body>
        <p className='lead'>{text}</p>
        <div className='d-flex justify-content-end gap-2'>
          <Button variant='secondary' onClick={close}>
            Отменить
          </Button>
          <Button variant='danger' onClick={handleRemove}>
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
