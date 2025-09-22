import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import TemplatePage from '../TemplatePage';
import { selectCurrentToken } from '../../services/slices/authSlice';
import { useEffect } from 'react';

export default function PageHome() {
  const navigate = useNavigate();
  const currentToken = useSelector(selectCurrentToken);

  useEffect(() => {
    if (!currentToken) {
      navigate('/login', { replace: true });
    }
  }, [currentToken, navigate]);

  if (!currentToken) {
    return null;
  }

  return (
    <TemplatePage>
      <p className='text-mutted'>Главная</p>
    </TemplatePage>
  );
}
