import api from ".";

export const addChannel = async (channel) => api.post('/api/v1/channels', channel);

export const removeChannel = async (channelId) => api.delete('/api/v1/channels/' + channelId);

const handleAddChannel = async (value) => {
  try {
    const res = await api.post('/api/v1/channels', { name: value });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

const handleRenameChannel = async (value, channelId) => {
  try {
    const res = await api.patch('/api/v1/channels/' + channelId, { name: value });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export const handleSubmitForm = (name) => async (value, channelId) => {
  switch (name) {
    case 'add-channel':
      return handleAddChannel(value);
    case 'rename-channel':
      return handleRenameChannel(value, channelId);
    default:
      return;
  }
};