import { json, redirect } from 'react-router-dom'
import { ActionFunctionArgs } from 'react-router-dom'
import { AuthResponse } from '../types/AuthContext'
import { Authority } from '../types/AuthContext'

interface Errors extends Error {
  username?: string
  password?: string
}

interface User {
  userId: number
  username: string
}

export const getUser = (): User | null => {
  const user = localStorage.getItem('user')
  if (user) {
    try {
      return JSON.parse(user) as User
    } catch (error) {
      throw new Error(`Error parsing user data: ${error}`)
    }
  }
  return null
}

export const getJwt = () => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    return jwt
  } else {
    return null
  }
}

export const getAuthorities = () => {
  const storedAuthorities = localStorage.getItem('authorities')
  if (storedAuthorities) {
    const parsedAuthorities = JSON.parse(storedAuthorities)
    return parsedAuthorities
  } else {
    return null
  }
}

export const authLoader = () => {
  const authorities: Authority[] = getAuthorities()
  const jwt = getJwt()
  return {
    jwt: jwt,
    authorities: authorities,
  }
}

export const checkUserAuth = () => {
  const authorities = getAuthorities()
  const isUser = authorities
    ? authorities.includes('USER') || authorities.includes('ADMIN')
    : false
  if (!isUser) {
    return redirect('/unauthorized')
  }
  return null
}

export const checkAdminAuth = () => {
  const authorities = getAuthorities()
  const isAdmin = authorities ? authorities.includes('ADMIN') : false
  if (!isAdmin) {
    return redirect('/unauthorized')
  }
  return null
}

export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData()
  const username = data.get('username')
  const password = data.get('password')
  const errors = {} as Errors

  //validate fields
  if (typeof username !== 'string' || username.length <= 4) {
    errors.username = 'invalid username: must be 5 or more characters'
  }
  if (typeof password !== 'string' || password.length <= 4) {
    errors.password = 'invalid password: must be 5 or more characters'
  }
  if (Object.keys(errors).length) {
    return errors
  }

  const authData = {
    username: username,
    password: password,
  }

  //POST request
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  })

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user' }, { status: response.status })
  }

  const responseData: AuthResponse = await response.json()
  const authorities = responseData.userDTO.authorities.map(
    (role) => role.authority
  )

  const user = {
    userId: responseData.userDTO.userId,
    username: responseData.userDTO.username,
  }

  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('authorities', JSON.stringify(authorities))
  localStorage.setItem('jwt', responseData.jwt)

  return redirect('/')
}
