import store from '../../store'
import { addMessage } from '../../store/slices/message'
import handleError from '../../utils/handleError'
import axios from '../clients/axios'
import socket from '../clients/socket'

socket.on('newMessage', (msgData) => {
  store.dispatch(addMessage(msgData))
})

const fetch = async () => axios.get('/api/v1/messages')

const add = async (msgData) => {
  try {
    const res = await axios.post('/api/v1/messages', msgData)
    return res.data
  }
  catch (error) {
    handleError(error)
  }
}

export { add as addMessage, fetch as fetchMessages }
