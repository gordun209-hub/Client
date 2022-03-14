import React, { FormEventHandler, SyntheticEvent } from 'react'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import { loginUser, logout } from '../features/users/authSlice'

const EnterPage = () => {
  const dispatch = useAppDispatch()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const user = useAppSelector(state => state.auth.user)
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      dispatch(loginUser(username, password))
      setUsername('')
      setPassword('')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div
      className='card'
      style={{
        width: '400px',
        margin: 'auto',
        marginTop: '100px',
        padding: '20px'
      }}
    >
      {!user ? (
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label>
            Email:
            <input
              value={username}
              type='text'
              onChange={e => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              value={password}
              type='password'
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <input type='submit' value='Login' />
        </form>
      ) : (
        <div>
          <button type='button' onClick={() => dispatch(logout())}>
            Log out
          </button>
        </div>
      )}
    </div>
  )
}
export default EnterPage
