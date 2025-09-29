import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

const channelAdapter = createEntityAdapter()

const channelSlice = createSlice({
  name: 'channel',
  initialState: channelAdapter.getInitialState(),
  reducers: {
    addChannel: channelAdapter.addOne,
    addChannels: channelAdapter.addMany,
    updateChannel: channelAdapter.updateOne,
    removeChannel: channelAdapter.removeOne,
  },
})

export const { addChannel, addChannels, updateChannel, removeChannel } = channelSlice.actions

export default channelSlice.reducer

// selectors

export const channelSelectors = channelAdapter.getSelectors(state => state.channel)

export const selectAllChannels = channelSelectors.selectAll

export const selectChannelById = channelSelectors.selectById
