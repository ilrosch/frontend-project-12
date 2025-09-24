import { io } from 'socket.io-client';
import { selectCurrentToken } from "../services/slices/authSlice";
import { addMessage } from "../services/slices/messageSlice";
import store from "../services/store";

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

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});