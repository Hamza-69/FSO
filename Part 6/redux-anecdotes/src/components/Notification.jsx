 import { useSelector } from "react-redux"

 const Notification = () => {
  const notification = useSelector(state => state.notification)
  const visiblity = useSelector(state => state.display)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: visiblity
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification