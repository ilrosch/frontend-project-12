import { Alert, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router';
import TemplatePage from '../TemplatePage';

export default function PageNotFond() {
  return (
    <TemplatePage>
      <div className='d-flex align-items-start'>
        <Alert variant='danger' className='text-center p-5 shadow-sm w-100'>
          <Alert.Heading className='display-1 fw-bold mb-3'>404</Alert.Heading>
          <h1 className='h4 text-muted'>Страница не найдена</h1>
          <p className='text-muted'>
            Но вы можете перейти{' '}
            <Link to='/' className='text-decoration-underline'>
              на&nbsp;главную&nbsp;страницу
            </Link>
          </p>
        </Alert>
      </div>
    </TemplatePage>
  );
}
