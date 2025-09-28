import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken } from '../../../store/slices/auth';
import handleApi from '../../../api';

import TemplatePage from '../../shared/TemplatePage';
import ChatBox from './ChatBox';
import createToastPromise from '../../../utils/toast';
import { useTranslation } from 'react-i18next';

export default function PageChat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentToken = useSelector(selectCurrentToken);
  const { t } = useTranslation();

  useEffect(() => {
    if (!currentToken) {
      navigate('/login', { replace: true });
    }
  }, [currentToken, navigate]);

  useEffect(() => {
    if (currentToken) {
      createToastPromise(handleApi.init(), {
        pending: t('toast.chat.init.pending'),
        error: t('toast.chat.init.error'),
      });
    }
  }, [currentToken, dispatch, t]);

  if (!currentToken) {
    return null;
  }

  return (
    <TemplatePage>
      <ChatBox />
    </TemplatePage>
  );
}
