import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken } from '../../../store/slices/auth';
import handleApi from '../../../api';

import TemplatePage from '../../shared/TemplatePage';
import ChatBox from './ChatBox';

export default function PageChat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentToken = useSelector(selectCurrentToken);

  useEffect(() => {
    if (!currentToken) {
      navigate('/login', { replace: true });
    }
  }, [currentToken, navigate]);

  useEffect(() => {
    if (currentToken) {
      handleApi.init();
    }
  }, [currentToken, dispatch]);

  if (!currentToken) {
    return null;
  }

  return (
    <TemplatePage>
      <ChatBox />
    </TemplatePage>
  );
}
