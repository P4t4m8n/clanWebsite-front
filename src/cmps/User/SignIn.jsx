
import { login } from '../../store/actions/user.actions'
import { Link } from 'react-router-dom'
import { useForm } from '../../customHooks/useForm'

export function SignIn() {

  const [fields, setFields, handleChange] = useForm({ username: '', password: '' })

  async function onLogin(ev) {
    ev.preventDefault()
    try {
      login(fields)
    }
    catch (err) { console.log(err) }
  }

  if (!fields) return
  const { username, password } = fields

  return (
    <section className='login-apply'>

      <form onSubmit={onLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          name='username'
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          name='password'
          value={password}
          autoComplete='on'
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
        <Link to='/apply'>Don't have an account? Apply Now!</Link>
    </section>



  )
}


