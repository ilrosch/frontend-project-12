import store from "../../store";
import { addMessage } from "../../store/slices/message";
import axios from "../clients/axios";
import socket from "../clients/socket";

socket.on('newMessage', (msgData) => {
  store.dispatch(addMessage(msgData));
});

const fetch = async () => axios.get('/api/v1/messages');

const add = async (msgData) => axios.post('/api/v1/messages', msgData);

export { add as addMessage, fetch as fetchMessages };
