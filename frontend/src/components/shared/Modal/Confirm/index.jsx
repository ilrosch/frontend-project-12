import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export default function ConfirmModal({ title, text, close, handleRemove }) {
  const { t } = useTranslation()

  return (
    <Modal show onHide={close}>
      <Modal.Header>
        <Modal.Title>{t(title)}</Modal.Title>
        <Button variant="close" onClick={close} />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t(text)}</p>
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={close}>
            {t('element.button.cancel')}
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            {t('element.button.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
