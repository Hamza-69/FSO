import PropTypes from 'prop-types'

const Login = ({ handleLogin, setUser, setPassword, user, password }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={user}
          data-testid = "name"
          name='Username'
          onChange={({ target }) => setUser(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          data-testid = "password"
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}
Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default Login