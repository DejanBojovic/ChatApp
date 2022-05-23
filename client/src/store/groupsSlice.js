import { createSlice } from '@reduxjs/toolkit'

const groupsSlice = createSlice({
  name: 'groups',
  initialState: { groups: [] },
  reducers: {
    addGroups(state, action) {
      state.groups = [...action.payload]
    },
    createGroup(state, action) {},
    joinGroup(state, action) {},
    leaveGroup(state, action) {},
  },
})

export const groupsActions = groupsSlice.actions
export default groupsSlice
