import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router';

export default function TemplatePage({ children }) {
  return (
    <div className='d-flex flex-column bg-light' style={{ height: `100vh` }}>
      <header className='d-flex py-3 bg-white shadow-sm' style={{ flex: '0 0' }}>
        <Container>
          <Row>
            <Link to='/'>Slack chat</Link>
          </Row>
        </Container>
      </header>
      <main className='d-flex py-3' style={{ flex: '1 1' }}>
        <Container>
          <Row>{children}</Row>
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
