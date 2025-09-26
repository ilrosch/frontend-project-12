import { Card } from 'react-bootstrap';
import TemplatePage from '../TemplatePage';
import { Link } from 'react-router';
import FormAuth from '../FormAuth';
import { SignUpSchema } from '../../services/schemas';
import { handleSubmitForm } from '../../api/channel';

export default function PageSingUp() {
  return (
    <TemplatePage>
      <div className='d-flex align-items-start'>
        <Card border='0' className='w-100 p-3 shadow-sm' style={{ maxWidth: `500px` }}>
          <Card.Body>
            <Card.Title className='fs-3 fw-bold mb-4'>Регистрация</Card.Title>
            <FormAuth
              fields={[
                { name: 'username', label: 'Имя пользователя', type: 'text' },
                { name: 'password', label: 'Пароль', type: 'password' },
                { name: 'confirmPassword', label: 'Подтвердите пароль', type: 'password' },
              ]}
              buttonText='Отправить'
              schema={SignUpSchema}
              handleSubmit={handleSubmitForm('sing-up')}
            />
          </Card.Body>
          <Card.Footer className='text-center py-3 bg-white'>
            <Card.Text>
              Уже есть аккаунт? <Link to='/login'>Вход</Link>
            </Card.Text>
          </Card.Footer>
        </Card>
      </div>
    </TemplatePage>
  );
}
