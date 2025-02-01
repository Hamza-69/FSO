import { createSlice } from '@reduxjs/toolkit'
import { changeDisplay } from './displayReducer'

const notificationSlice = createSlice({
  name : 'notification',
  initialState: '',
  reducers : {
    changeNotification(_, action) {
      return action.payload
    }
  }
})

export const {changeNotification} = notificationSlice.actions

export const setNotification = (content, s) => {
  return async dispatch => {
    dispatch(changeNotification(content))
    dispatch(changeDisplay(''))
    setTimeout(() => dispatch(changeDisplay('none')), s*1000)
  }
}
export default notificationSlice.reducer