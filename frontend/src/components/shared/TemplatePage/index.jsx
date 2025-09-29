import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { removeCredential, selectCurrentToken } from '../../../store/slices/auth'
import { useTranslation } from 'react-i18next'
import { createToastPromise } from '../../../utils/toast'

export default function TemplatePage({ children }) {
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const token = useSelector(selectCurrentToken)

  const handleExit = () =>
    createToastPromise(
      (async () => {
        localStorage.removeItem('user')
        dispatch(removeCredential())
        navigation('/login', { replace: true })
      })(),
      {
        pending: t('toast.auth.logout.pending'),
        success: t('toast.auth.logout.success'),
        error: t('toast.auth.logout.error'),
      },
    )

  return (
    <div className="d-flex flex-column bg-light" style={{ height: `100vh` }}>
      <header className="d-flex py-2 bg-white shadow-sm" style={{ flex: '0 0' }}>
        <Container fluid="lg">
          <Row style={{ minHeight: '40px' }}>
            <Col className="d-flex justify-content-between align-items-center">
              <Link to="/" className="fw-bold text-primary link-underline link-underline-opacity-0">
                {t('layout.header.title')}
              </Link>

              {token && (
                <Button variant="outline-danger" onClick={handleExit}>
                  {t('element.button.exit')}
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </header>
      <main className="d-flex py-3" style={{ flex: '1 1' }}>
        <Container fluid="lg" className="h-100">
          <Row className="h-100">{children}</Row>
        </Container>
      </main>
      <footer className="d-flex py-3 bg-dark" style={{ flex: '0 0' }}>
        <Container fluid="lg">
          <Row>
            <p className="text-secondary mb-0">{t('layout.footer.text')}</p>
          </Row>
        </Container>
      </footer>
    </div>
  )
}
