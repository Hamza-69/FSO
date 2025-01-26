import { useImperativeHandle, forwardRef, useState  } from 'react'
import PropTypes from 'prop-types'

const Toggleble = forwardRef(({ text, text2, children, position }, ref) => {
  const [hidden, setHidden] = useState(true)
  const styleHidden = hidden ? { display : 'none' }: { display : '' }
  const styleNotHidden = hidden ? { display : '' }: { display : 'none' }

  const toggle = () => { setHidden(!hidden) }
  useImperativeHandle(ref, () => {
    return {
      toggle
    }
  })

  return (
    <>
      <span style = { styleHidden } className='hidden'>
        { !position || <button onClick={ toggle }>{ text2 || 'cancel' }</button> }
        { children }
        { position || <button onClick={ toggle }>{ text2 || 'cancel' }</button> }
      </span>
      <span style = { styleNotHidden } className='shown'>
        <button onClick={ toggle }>{ text }</button>
      </span>
    </>
  )
})

Toggleble.displayName = 'Toggleble'

Toggleble.propTypes = {
  text: PropTypes.string.isRequired
}

export default Toggleble