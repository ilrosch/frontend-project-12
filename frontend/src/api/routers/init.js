import store from '../../store'
import { addChannels } from '../../store/slices/channel'
import { addMessages } from '../../store/slices/message'
import { fetchChannels } from './channel'
import { fetchMessages } from './message'

const fetchInitData = async () => {
  try {
    const psChannels = fetchChannels()
    const psMesssages = fetchMessages()
    const [channelsData, messageData] = await Promise.all([psChannels, psMesssages])
    store.dispatch(addChannels(channelsData.data))
    store.dispatch(addMessages(messageData.data))
  }
  catch (err) {
    console.error(err)
  }
}

export { fetchInitData }
