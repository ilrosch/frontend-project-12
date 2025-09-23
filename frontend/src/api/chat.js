import api from ".";

export const fetchChannels = async () => api.get('/api/v1/channels');

export const fetchMessage = async () => api.get(`/api/v1/messages`);
