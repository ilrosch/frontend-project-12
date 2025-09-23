import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const messageAdapter = createEntityAdapter();

const messageSlice = createSlice({
  name: 'message',
  initialState: messageAdapter.getInitialState(),
  reducers: {
    addmessage: messageAdapter.addOne,
    addmessages: messageAdapter.addMany,
    updatemessage: messageAdapter.updateOne,
    removemessage: messageAdapter.removeOne,
  },
});

export const { addmessage, addmessages, updatemessage, removemessage } = messageSlice.actions;

export default messageSlice.reducer;

// selectors

export const messageSelectors = messageAdapter.getSelectors((state) => state.message);

export const selectAllmessages = messageSelectors.selectAll;

export const selectIdsmessages = messageSelectors.selectIds;
