import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import TemplatePage from '../TemplatePage';
import { selectCurrentToken } from '../../services/slices/authSlice';
import { useEffect } from 'react';
import chat from '../../api/chat';
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
      chat.loadInitData();
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
