import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";

type User = {
  name: string
  lastName: string
  email: string
  avatar: string
  id: number
}

interface Credentials {
  token: string | null
  data: User | null
}

const credentialsToJSON = localStorage.getItem('credentials')
const credentials: Credentials = credentialsToJSON ? JSON.parse(credentialsToJSON) : null

const initialState: Credentials = {
  data: credentials?.data,
  token: credentials?.token
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      localStorage.setItem('credentials', JSON.stringify(payload))
      state.data = payload.data
      state.token = payload.token
    },

    updateCredentials: (state, { payload }) => {
      state.data = { ...state.data, ...payload }
      localStorage.setItem('credentials', JSON.stringify(state))
    },

    loggedOut: state => {
      localStorage.removeItem('credentials')
      state.data = null
      state.token = null
    }
  }
})

export const { setCredentials, loggedOut, updateCredentials } = AuthSlice.actions
export default AuthSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.data
export const selectCurrentToken = (state: RootState) => state.auth.token
