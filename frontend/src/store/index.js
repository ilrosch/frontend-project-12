import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/auth';
import channelReducer from './slices/channel';
import messageReducer from './slices/message';

const store = configureStore({
  reducer: {
    auth: authReducer,
    channel: channelReducer,
    message: messageReducer,
  },
});

export default store;
