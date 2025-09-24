import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import TemplatePage from '../TemplatePage';
import { selectCurrentToken } from '../../services/slices/authSlice';
import { useEffect } from 'react';
import { fetchChannels, fetchMessage } from '../../api/chat';
import Channels from './Channels';
import { addChannels } from '../../services/slices/channelSlice';
import { addMessages } from '../../services/slices/messageSlice';

const loadData = async (dispatch) => {
  try {
    const psChannels = fetchChannels();
    const psMesssages = fetchMessage();
    const [channelsData, messageData] = await Promise.all([psChannels, psMesssages]);
    dispatch(addChannels(channelsData.data));
    dispatch(addMessages(messageData.data));
  } catch (err) {
    console.error(err);
  }
};

export default function PageHome() {
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
      loadData(dispatch);
    }
  }, [currentToken, dispatch]);

  if (!currentToken) {
    return null;
  }

  return (
    <TemplatePage>
      <Channels />
    </TemplatePage>
  );
}
