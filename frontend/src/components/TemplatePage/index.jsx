import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { removeCredential, selectCurrentToken } from '../../services/slices/authSlice';

export default function TemplatePage({ children }) {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);

  const handleExit = () => {
    localStorage.removeItem('user');
    dispatch(removeCredential());
    navigation('/login', { replace: true });
  };

  return (
    <div className='d-flex flex-column bg-light' style={{ height: `100vh` }}>
      <header className='d-flex py-2 bg-white shadow-sm' style={{ flex: '0 0' }}>
        <Container>
          <Row style={{ minHeight: '40px' }}>
            <Col className='d-flex justify-content-between align-items-center'>
              <Link to='/' className='fw-bold text-primary link-underline link-underline-opacity-0'>
                Hexlet chat
              </Link>

              {token && (
                <Button variant='danger' onClick={handleExit}>
                  Выход
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </header>
      <main className='d-flex py-3' style={{ flex: '1 1' }}>
        <Container className='h-100'>
          <Row className='h-100'>{children}</Row>
        </Container>
      </main>
      <footer className='d-flex py-3 bg-dark' style={{ flex: '0 0' }}>
        <Container>
          <Row>
            <p className='text-secondary mb-0'>©2025 Slack Chat | Hexlet project</p>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
