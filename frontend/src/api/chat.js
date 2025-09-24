import api from ".";

export const fetchChannels = async () => api.get('/api/v1/channels');

export const fetchMessage = async () => api.get('/api/v1/messages');

export const sendMessage = async (msgData) => api.post('/api/v1/messages', msgData);
