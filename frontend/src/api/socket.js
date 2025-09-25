import { io } from 'socket.io-client';
import { selectCurrentToken } from "../services/slices/authSlice";
import { addMessage } from "../services/slices/messageSlice";
import store from "../services/store";
import { addChannel, removeChannel, updateChannel } from '../services/slices/channelSlice';

const socket = io({
  auth: { token: selectCurrentToken(store.getState()) },
  transports: ['websocket', 'polling']
});

socket.on('connect', () => {
  console.log('Connected to server with socket ID:', socket.id);
});

socket.on('newMessage', (msgData) => {
  store.dispatch(addMessage(msgData));
});

socket.on('newChannel', (channelData) => {
  store.dispatch(addChannel(channelData));
});

socket.on('removeChannel', (channelData) => {
  store.dispatch(removeChannel(channelData.id))
});

socket.on('renameChannel', (channel) => {
  store.dispatch(updateChannel({ id: channel.id, changes: { name: channel.name } }));
});


socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});