import { getJwt } from './authFunctions'
import { json } from 'react-router-dom'

export const fetchStylists = async () => {
  try {
    const jwt = getJwt()
    const response = await fetch('http://localhost:8080/api/stylists/dto', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error fetching stylists')
    }
    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message || error}`)
    } else {
      throw new Error('An unknown error occured while fetching stylists')
    }
  }
}

export const stylistReportViewLoader = async () => {
  const jwt = getJwt()
  const response = await fetch(
    'http://localhost:8080/api/reports/stylistsReport',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }
  )
  if (!response.ok) {
    throw json(
      { message: 'could not fetch report records' },
      { status: response.status }
    )
  }
  return await response.json()
}

export const stylistAggregateReportViewLoader = async () => {
  const jwt = getJwt()
  const response = await fetch(
    'http://localhost:8080/api/reports/stylistsAggregateReport',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }
  )
  if (!response.ok) {
    throw json({ message: 'could not fetch report records' }, { status: 500 })
  }
  return await response.json()
}
