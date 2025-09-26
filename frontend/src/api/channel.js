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

const handleLogin = async (credentials) => {
  try {
    const res = await api.post('api/v1/login', credentials);
    return res.data;
  } catch ({ status }) {
    switch (status) {
      case 401:
        throw new Error('Неверные имя пользователя или пароль!');
      default:
        throw new Error('Неизвестная ошибка');
    }
  }
}

const handleSingUp = async (credentials) => {
  try {
    const res = await api.post('api/v1/signup', credentials);
    return res.data;
  } catch ({ status }) {
    switch (status) {
      case 409:
        throw new Error('Пользователь уже существует!');
      default:
        throw new Error('Неизвестная ошибка');
    }
  }
};


export const handleSubmitForm = (name) => async (value, options) => {
  switch (name) {
    case 'add-channel':
      return handleAddChannel(value);
    case 'rename-channel':
      return handleRenameChannel(value, options);
    case 'login':
      return handleLogin(value);
    case 'sing-up':
      return handleSingUp(value);
    default:
      return;
  }
};