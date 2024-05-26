import { getJwt } from './authFunctions'
import { json } from 'react-router-dom'
import { redirect } from 'react-router-dom'
import { ActionFunctionArgs } from 'react-router-dom'

interface Errors extends Error {
  username?: string
  password?: string
}

export const usersLoader = async () => {
  const jwt = getJwt()
  const response = await fetch('http://localhost:8080/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
  if (!response.ok) {
    throw json({ message: 'could not fetch users' }, { status: 500 })
  }
  return await response.json()
}

export const newUserAction = async ({ request }: ActionFunctionArgs) => {
  const jwt = getJwt()
  if (jwt === null) {
    return
  }
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

  const userData = {
    username: username,
    password: password
  }

  const response = await fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(userData),
  })

  if (!(response.status === 200 || response.status === 201)) {
    throw json(
      { message: 'There was a problem saving the user' },
      { status: 500 }
    )
  }

  return redirect('/users')
}

export const deleteUser = async ({ userId }: { userId: number }) => {
  const jwt = getJwt()
  if (jwt === null) {
    return
  }

  const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })

  if (!(response.status === 204)) {
    throw new Error('There was an error deleting the user')
  }

  return {}
}
