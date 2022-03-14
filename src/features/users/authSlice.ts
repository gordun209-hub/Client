import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import blogServices from '../../services/blogs'
import loginService from '../../services/login'

type TInitialState = {
  user: {
    token: string | null
    username: string | null
  }
}
const initialState: TInitialState = {
  user: {
    token: null,
    username: null
  }
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: state => {
      state.user.token = null
    }
  }
})

export const initializeUser = () => {
  const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJson) {
    const user = JSON.parse(loggedUserJson)
    blogServices.setToken(user.token)
    return user
  }
}
export const { login, logout } = authSlice.actions
export const loginUser =
  // todo add type
  (username: string, password: string) => async (dispatch: any) => {
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogServices.setToken(user.token)
      dispatch(login(user))
    } catch (error) {
      console.log(error)
    }
  }
export const logoutUser = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  blogServices.setToken('')
  return logout()
}
