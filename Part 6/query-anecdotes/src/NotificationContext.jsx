import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
        return action.payload
    default:
        return state
  }
}

const NotificationContext = createContext()

export const useNotification = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContextProvider