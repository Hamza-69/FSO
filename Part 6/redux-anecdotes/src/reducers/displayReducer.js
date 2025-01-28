import { createSlice } from '@reduxjs/toolkit'

const displaySlice = createSlice({
  name : 'display',
  initialState: 'none',
  reducers : {
    changeDisplay(_, action) {
      return action.payload
    },
  }
})

export const {changeDisplay} = displaySlice.actions
export default displaySlice.reducer