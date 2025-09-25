import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { removeChannel } from "./channelSlice";

const messageAdapter = createEntityAdapter();

const messageSlice = createSlice({
  name: 'message',
  initialState: messageAdapter.getInitialState(),
  reducers: {
    addMessage: messageAdapter.addOne,
    addMessages: messageAdapter.addMany,
    updateMessage: messageAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload: channelId }) => {
      const messages = Object.values(state.entities);
      const messageIdsNotChannel = messages.filter((msg) => msg.channelId === channelId).map(({ id }) => id);
      messageAdapter.removeMany(state, messageIdsNotChannel);
    })
  },
});

export const { addMessage, addMessages, updateMessage } = messageSlice.actions;

export default messageSlice.reducer;

// selectors

export const messageSelectors = messageAdapter.getSelectors((state) => state.message);

export const selectAllmessages = messageSelectors.selectAll;

export const selectIdsmessages = messageSelectors.selectIds;
