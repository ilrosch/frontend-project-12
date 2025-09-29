import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router';
import TemplatePage from '../../shared/TemplatePage';
import FormAuth from '../../shared/FormAuth';
import schemas from '../../../validation';
import handleApi from '../../../api';
import { useTranslation } from 'react-i18next';
import { createToastPromise } from '../../../utils/toast';

export default function PageLogin() {
  const { t } = useTranslation();

  return (
    <TemplatePage>
      <div className='d-flex align-items-start'>
        <Card border='0' className='w-100 p-3 shadow-sm' style={{ maxWidth: `500px` }}>
          <Card.Body>
            <Card.Title className='fs-3 fw-bold mb-4'>{t('login.title')}</Card.Title>
            <FormAuth
              fields={[
                { name: 'username', label: 'login.form.name', type: 'text' },
                { name: 'password', label: 'login.form.password', type: 'password' },
              ]}
              buttonText='element.button.login'
              schema={schemas.login(t)}
              handleSubmit={async (value) => {
                const res = await createToastPromise(handleApi.auth.login(value), {
                  pending: t('toast.auth.login.pending'),
                  success: t('toast.auth.login.success'),
                });
                return res;
              }}
            />
          </Card.Body>
          <Card.Footer className='text-center py-3 bg-white'>
            <Card.Text>
              {t('login.text')} <Link to='/signup'>{t('signup.title')}</Link>
            </Card.Text>
          </Card.Footer>
        </Card>
      </div>
    </TemplatePage>
  );
}
