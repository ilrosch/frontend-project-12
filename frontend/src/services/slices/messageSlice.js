import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const messageAdapter = createEntityAdapter();

const messageSlice = createSlice({
  name: 'message',
  initialState: messageAdapter.getInitialState(),
  reducers: {
    addMessage: messageAdapter.addOne,
    addMessages: messageAdapter.addMany,
    updateMessage: messageAdapter.updateOne,
    removeMessage: messageAdapter.removeOne,
  },
});

export const { addMessage, addMessages, updateMessage, removemMssage } = messageSlice.actions;

export default messageSlice.reducer;

// selectors

export const messageSelectors = messageAdapter.getSelectors((state) => state.message);

export const selectAllmessages = messageSelectors.selectAll;

export const selectIdsmessages = messageSelectors.selectIds;
