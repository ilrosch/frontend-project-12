import { addChannel, fetchChannels, removeChannel, renameChannel } from "./routers/channel";
import { addMessage, fetchMessages } from "./routers/message";
import { fetchInitData } from "./routers/init";
import { login, signup } from "./routers/auth";

const handleApi = {
  auth: {
    login,
    signup
  },
  channel: {
    add: addChannel,
    rename: renameChannel,
    remove: removeChannel,
    fetch: fetchChannels,
  },
  message: {
    add: addMessage,
    fetch: fetchMessages,
  },
  init: fetchInitData,
}

export default handleApi;
