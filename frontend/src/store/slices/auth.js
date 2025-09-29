import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : { username: null, token: null }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredential: (state, { payload: { username, token } }) => {
      state.username = username
      state.token = token
    },
    removeCredential: (state) => {
      state.username = null
      state.token = null
    },
  },
})

export const { setCredential, removeCredential } = authSlice.actions

export default authSlice.reducer

// selectors

const selectCurrentUser = state => state.auth.username

const selectCurrentToken = state => state.auth.token

export { selectCurrentToken, selectCurrentUser }
