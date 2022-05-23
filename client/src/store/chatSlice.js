import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    groupName: '',
    participants: [],
  },
  reducers: {
    addChat(state, action) {
      state.participants = []
      state.participants = [...action.payload.participants]
      state.groupName = action.payload.groupName
    },
    clearChat(state) {
      state.participants = []
      state.groupName = ''
    },
  },
})

export const chatActions = chatSlice.actions
export default chatSlice
