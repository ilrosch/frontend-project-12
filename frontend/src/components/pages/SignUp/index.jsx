import { Card } from 'react-bootstrap'
import { Link } from 'react-router'
import TemplatePage from '../../shared/TemplatePage'
import FormAuth from '../../shared/FormAuth'
import schemas from '../../../validation'
import handleApi from '../../../api'
import { useTranslation } from 'react-i18next'
import { createToastPromise } from '../../../utils/toast'

export default function PageSignUp() {
  const { t } = useTranslation()

  return (
    <TemplatePage>
      <div className="d-flex align-items-start">
        <Card border="0" className="w-100 p-3 shadow-sm" style={{ maxWidth: `500px` }}>
          <Card.Body>
            <Card.Title className="fs-3 fw-bold mb-4">{t('signup.title')}</Card.Title>
            <FormAuth
              fields={[
                { name: 'username', label: 'signup.form.name', type: 'text' },
                { name: 'password', label: 'signup.form.password', type: 'password' },
                { name: 'confirmPassword', label: 'signup.form.confirmPassword', type: 'password' },
              ]}
              buttonText="signup.form.button"
              schema={schemas.signup(t)}
              handleSubmit={async (value) => {
                const res = await createToastPromise(handleApi.auth.signup(value), {
                  pending: t('toast.auth.signup.pending'),
                  sucess: t('toast.auth.signup.success'),
                })
                return res
              }}
            />
          </Card.Body>
          <Card.Footer className="text-center py-3 bg-white">
            <Card.Text>
              {t('signup.text')}
              {' '}
              <Link to="/login">{t('login.title')}</Link>
            </Card.Text>
          </Card.Footer>
        </Card>
      </div>
    </TemplatePage>
  )
}
