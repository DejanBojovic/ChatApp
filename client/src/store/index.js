import { configureStore } from '@reduxjs/toolkit'

import authSlice from './authSlice'
import usersSlice from './usersSlice'
import chatSlice from './chatSlice'
import groupsSlice from './groupsSlice'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    chat: chatSlice.reducer,
    groups: groupsSlice.reducer,
  },
})

export default store
