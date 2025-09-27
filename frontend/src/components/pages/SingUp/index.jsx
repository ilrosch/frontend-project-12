import { Card } from 'react-bootstrap';
import { Link } from 'react-router';
import TemplatePage from '../../shared/TemplatePage';
import FormAuth from '../../shared/FormAuth';
import schemas from '../../../validation';
import handleApi from '../../../api';
import { useTranslation } from 'react-i18next';

export default function PageSingUp() {
  const { t } = useTranslation();

  return (
    <TemplatePage>
      <div className='d-flex align-items-start'>
        <Card border='0' className='w-100 p-3 shadow-sm' style={{ maxWidth: `500px` }}>
          <Card.Body>
            <Card.Title className='fs-3 fw-bold mb-4'>{t('singup.title')}</Card.Title>
            <FormAuth
              fields={[
                { name: 'username', label: 'singup.form.name', type: 'text' },
                { name: 'password', label: 'singup.form.password', type: 'password' },
                { name: 'confirmPassword', label: 'singup.form.confirmPassword', type: 'password' },
              ]}
              buttonText='element.button.send'
              schema={schemas.singUp(t)}
              handleSubmit={handleApi.auth.singUp}
            />
          </Card.Body>
          <Card.Footer className='text-center py-3 bg-white'>
            <Card.Text>
              {t('singup.text')} <Link to='/login'>{t('login.title')}</Link>
            </Card.Text>
          </Card.Footer>
        </Card>
      </div>
    </TemplatePage>
  );
}
