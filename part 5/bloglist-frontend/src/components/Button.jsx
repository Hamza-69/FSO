const Button = ({ text, handleClick, className }) => {
  return (
    <button onClick = {handleClick} className={className}>{text}</button>
  )
}

export default Button