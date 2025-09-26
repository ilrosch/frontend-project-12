import { io } from 'socket.io-client';
import { selectCurrentToken } from "../../store/slices/auth";
import store from '../../store';

const socket = io({
  auth: { token: selectCurrentToken(store.getState()) },
  transports: ['websocket', 'polling']
});

socket.on('connect', () => {
  console.log('Connected to server with socket ID:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});

export default socket;
