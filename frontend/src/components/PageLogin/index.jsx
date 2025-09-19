import { Card } from 'react-bootstrap';
import TemplatePage from '../TemplatePage';
import FormLogin from './FormLogin';
import { Link } from 'react-router';

export default function PageLogin() {
  return (
    <TemplatePage>
      <div className='d-flex'>
        <Card border='0' className='w-100 p-3 shadow-sm' style={{ maxWidth: `500px` }}>
          <Card.Body>
            <Card.Title className='fs-3 fw-bold mb-4'>Вход</Card.Title>
            <FormLogin />
          </Card.Body>
          <Card.Footer className='text-center py-3 bg-white'>
            <Card.Text>
              Нет аккаунта? <Link to='#'>Регистрация</Link>
            </Card.Text>
          </Card.Footer>
        </Card>
      </div>
    </TemplatePage>
  );
}
