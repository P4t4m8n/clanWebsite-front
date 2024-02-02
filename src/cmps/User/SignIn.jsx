
import { useState } from 'react'
import { login, signup } from '../../store/actions/user.actions'
import { Link } from 'react-router-dom'
import { userService } from '../../servies/user.service'
import { unitService } from '../../servies/unit.service'

export function SignIn() {

  const [isSignup, setIsSignUp] = useState(false)
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

  function isLogin(ev) {
    ev.preventDefault()
    isSignup ? onSignup(credentials) : onLogin(credentials)
  }

  function handleChange({ target }) {
    const field = target.name
    const value = target.value
    setCredentials(prev => ({ ...prev, [field]: value }))
  }

  async function onLogin(ev) {
    try {
      login(credentials)
    }
    catch (err) { console.log(err) }
  }

  async function onSignup(credentials) {
    try {
      signup(credentials)
    }
    catch (err) { console.log(err) }
  }

  const { username, email, password } = credentials
  const joinUnits = unitService.getAvailableJoinUnits()

  return (

    <form onSubmit={isLogin}>
      <h2>{isSignup ? 'SignUp' : 'Login'}</h2>
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
        onChange={handleChange}
      />
      {isSignup &&
        <>
          <input
            type="email"
            placeholder="Email"
            name='email'
            value={email}
            onChange={handleChange}
          />
          <select onChange={handleChange} name="units">
            {joinUnits.map((unit, idx) =>
              <option key={idx} value={[unit]}>{unit.name}</option>
            )}
          </select>
        </>
      }
      <button type="submit">{(isSignup) ? ' Signup' : 'Sign in'}</button>
      <Link href="#" onClick={() => setIsSignUp(!isSignup)} >
        {isSignup ?
          'Already a member? Login' :
          "Don't have an account? Sign Up"
        }
      </Link>
    </form>



  )
}


