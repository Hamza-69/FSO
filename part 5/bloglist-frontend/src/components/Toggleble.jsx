import { useImperativeHandle, forwardRef, useState  } from 'react'
import PropTypes from 'prop-types'

const Toggleble = forwardRef(({ text, text2, children, position }, ref) => {
  const [hidden, setHidden] = useState(true)
  const styleHidden = hidden ? { display : 'none' }: { display : 'unset' }
  const styleNotHidden = hidden ? { display : 'unset' }: { display : 'none' }

  const toggle = () => { setHidden(!hidden) }
  useImperativeHandle(ref, () => {
    return {
      toggle
    }
  })

  return (
    <>
      <div style = { styleHidden } >
        { !position || <button onClick={ toggle }>{ text2 || 'cancel' }</button> }
        { children }
        { position || <button onClick={ toggle }>{ text2 || 'cancel' }</button> }
      </div>
      <div style = { styleNotHidden } >
        <button onClick={ toggle }>{ text }</button>
      </div>
    </>
  )
})

Toggleble.displayName = 'Toggleble'

Toggleble.propTypes = {
  text: PropTypes.string.isRequired
}

export default Toggleble