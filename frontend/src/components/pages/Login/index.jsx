import { Card } from 'react-bootstrap';
import { Link } from 'react-router';
import TemplatePage from '../../shared/TemplatePage';
import FormAuth from '../../shared/FormAuth';
import schemas from '../../../validation';
import handleApi from '../../../api';

export default function PageLogin() {
  return (
    <TemplatePage>
      <div className='d-flex align-items-start'>
        <Card border='0' className='w-100 p-3 shadow-sm' style={{ maxWidth: `500px` }}>
          <Card.Body>
            <Card.Title className='fs-3 fw-bold mb-4'>Вход</Card.Title>
            <FormAuth
              fields={[
                { name: 'username', label: 'Ваш ник', type: 'text' },
                { name: 'password', label: 'Ваш пароль', type: 'password' },
              ]}
              buttonText='Войти'
              schema={schemas.login}
              handleSubmit={handleApi.auth.login}
            />
          </Card.Body>
          <Card.Footer className='text-center py-3 bg-white'>
            <Card.Text>
              Нет аккаунта? <Link to='/singup'>Регистрация</Link>
            </Card.Text>
          </Card.Footer>
        </Card>
      </div>
    </TemplatePage>
  );
}
