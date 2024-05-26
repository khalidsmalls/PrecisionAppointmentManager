import { Dispatch, SetStateAction } from 'react'

export type Authority = {
  roleId: number
  authority: string
}

export type UserDTO = {
  userId: number
  username: string
  authorities: Authority[]
}

export type AuthResponse = {
  userDTO: UserDTO
  jwt: string
}

export type AuthContext = {
  auth: AuthResponse
  setAuth: Dispatch<SetStateAction<AuthResponse>>
}
