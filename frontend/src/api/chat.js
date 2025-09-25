import api from ".";
import { addChannels } from "../services/slices/channelSlice";
import { addMessages } from "../services/slices/messageSlice";
import store from "../services/store";

export const fetchChannels = async () => api.get('/api/v1/channels');

export const fetchMessage = async () => api.get('/api/v1/messages');

export const sendMessage = async (msgData) => api.post('/api/v1/messages', msgData);

const loadInitData = async () => {
  try {
    const psChannels = fetchChannels();
    const psMesssages = fetchMessage();
    const [channelsData, messageData] = await Promise.all([psChannels, psMesssages]);
    store.dispatch(addChannels(channelsData.data));
    store.dispatch(addMessages(messageData.data));
  } catch (err) {
    console.error(err);
  }
};


export default {
  loadInitData,
  fetchChannels,
  fetchMessage,
  sendMessage,
}
