import { getJwt } from './authFunctions'
import {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  json,
  redirect,
} from 'react-router-dom'

export const ClientsLoader = async () => {
  const jwt = getJwt()
  if (jwt === null) {
    return
  }
  const response = await fetch('http://localhost:8080/api/clients', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })

  if (!response.ok) {
    throw json(
      { message: 'there was an error fetching clients' },
      { status: response.status }
    )
  }

  const responseData = await response.json()
  return responseData
}

export const fetchClients = async () => {
  const jwt = getJwt()
  const response = await fetch('http://localhost:8080/api/clients/dto', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
  if (!response.ok) {
    throw new Error('Error fetching clients')
  }
  return await response.json()
}

export const getClientByIdLoader = async ({ params }: LoaderFunctionArgs) => {
  const jwt = getJwt()
  if (jwt === null) {
    return
  }
  const id = params.id
  const response = await fetch(`http://localhost:8080/api/clients/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })
  if (!response.ok) {
    throw json(
      { message: 'there was an error fetching the client' },
      { status: response.status }
    )
  }

  const responseData = await response.json()
  return responseData
}

export const createOrModifyClientAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const jwt = getJwt()
  if (jwt === null) {
    return
  }
  const method = request.method
  const data = await request.formData()

  const clientData = {
    clientId: data.get('id'),
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    email: data.get('email'),
    phone: data.get('phone'),
    userId: data.get('userId')
  }

  let url = 'http://localhost:8080/api/clients'

  if (method === 'PUT') {
    const id = params.id
    url = `http://localhost:8080/api/clients/${id}`
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(clientData),
  })

  if (!(response.status === 200 || response.status === 201)) {
    throw json(
      { message: 'There was a problem saving the client' },
      { status: response.status }
    )
  }

  return redirect('/clients')
}

export const deleteClientAction = async ({ params }: ActionFunctionArgs) => {
  const jwt = getJwt()
  if (jwt === null) {
    return
  }

  const id = params.id

  const response = await fetch(`http://localhost:8080/api/clients/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })

  if (!(response.status === 204)) {
    throw json(
      { message: 'there was an error deleting the client' },
      { status: response.status }
    )
  }

  return redirect('/clients')
}
