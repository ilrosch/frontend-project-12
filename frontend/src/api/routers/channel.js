import store from "../../store";
import { addChannel, removeChannel, updateChannel } from "../../store/slices/channel";
import handleError from "../../utils/handleError";
import axios from "../clients/axios";
import socket from "../clients/socket";

socket.on('newChannel', (channelData) => {
  store.dispatch(addChannel(channelData));
});

socket.on('removeChannel', (channelData) => {
  store.dispatch(removeChannel(channelData.id))
});

socket.on('renameChannel', (channel) => {
  store.dispatch(updateChannel({ id: channel.id, changes: { name: channel.name } }));
});

const fetch = async () => axios.get('/api/v1/channels');

const remove = async (channelId) => axios.delete('/api/v1/channels/' + channelId);

const add = async (value) => {
  try {
    const res = await axios.post('/api/v1/channels', { name: value });
    return res.data;
  } catch (err) {
    handleError(err);
  }
}

const rename = async (value, channelId) => {
  try {
    const res = await axios.patch('/api/v1/channels/' + channelId, { name: value });
    return res.data;
  } catch (err) {
    handleError(err);
  }
}

export { add as addChannel, rename as renameChannel, remove as removeChannel, fetch as fetchChannels };
