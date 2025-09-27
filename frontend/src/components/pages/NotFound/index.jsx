import { Alert } from 'react-bootstrap';
import { Link } from 'react-router';
import TemplatePage from '../../shared/TemplatePage';
import { useTranslation } from 'react-i18next';

export default function PageNotFond() {
  const { t } = useTranslation();

  return (
    <TemplatePage>
      <div className='d-flex align-items-start'>
        <Alert variant='danger' className='text-center p-5 shadow-sm w-100'>
          <Alert.Heading className='display-1 fw-bold mb-3'>404</Alert.Heading>
          <h1 className='h4 text-muted'>{t('notFound.title')}</h1>
          <p className='text-muted'>
            {t('notFound.text')}{' '}
            <Link to='/' className='text-decoration-underline'>
              {t('notFound.link')}
            </Link>
          </p>
        </Alert>
      </div>
    </TemplatePage>
  );
}
