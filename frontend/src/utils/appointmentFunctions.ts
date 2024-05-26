import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from 'react-router-dom'
import { getJwt } from './authFunctions'

export const appointmentViewLoader = async () => {
  const jwt = getJwt()
  if (jwt === null) {
    return
  }
  const response = await fetch(
    'http://localhost:8080/api/appointments/appointmentsView',
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
      { message: 'could not fetch appointments' },
      { status: response.status }
    )
  }

  return await response.json()
}

export const getAppointmentViewByIdLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  const jwt = getJwt()
  if (jwt === null) {
    return
  }
  const id = params.id
  const response = await fetch(
    `http://localhost:8080/api/appointments/appointmentsView/${id}`,
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
      { message: 'could not fetch appointment' },
      { status: response.status }
    )
  }

  return await response.json()
}

export const getTodaysUpcomingAppointmentsLoader = async () => {
  const response = await fetch(
    'http://localhost:8080/api/appointments/appointmentsView/upcoming',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    throw json(
      { message: 'unable to fetch appointments' },
      { status: response.status }
    )
  }

  return await response.json()
}

export const createOrModifyAppointmentAction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const jwt = getJwt()
  if (!jwt) {
    return
  }

  const method = request.method
  const data = await request.formData()

  const date = data.get('date')
  const startTime = data.get('startTime')
  const endTime = data.get('endTime')

  const startTimeISOString = formatUTCDate(date, startTime)
  const endTimeISOString = formatUTCDate(date, endTime)

  const appointment = {
    appointmentId: data.get('appointmentId'),
    title: data.get('title'),
    description: data.get('description'),
    stylistId: data.get('stylistId'),
    clientId: data.get('clientId'),
    startTime: startTimeISOString,
    endTime: endTimeISOString,
    userId: data.get('userId'),
  }

  let url = 'http://localhost:8080/api/appointments'

  if (method === 'PUT') {
    const id = params.id
    url = `http://localhost:8080/api/appointments/${id}`
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(appointment),
  })

  if (!(response.status === 201 || response.status === 200)) {
    throw json(
      { message: 'There was a problem saving the appointment' },
      { status: response.status }
    )
  }

  if (method === 'POST') {
    return redirect('/appointments')
  }
  if (method === 'PUT') {
    return redirect(`/clients/${appointment.clientId}`)
  }
}

export const deleteAppointmentAction = async ({
  params,
}: ActionFunctionArgs) => {
  const jwt = getJwt()
  if (jwt === null) {
    return
  }

  const id = params.id

  const response = await fetch(`http://localhost:8080/api/appointments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  })

  if (!(response.status === 204)) {
    throw json(
      { message: 'there was an error deleting the appointment' },
      { status: response.status }
    )
  }

  return redirect('/appointments')
}

export const getAppointmentsByClientIdLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  const jwt = getJwt()
  if (!jwt) {
    return
  }
  const id = params.id
  const response = await fetch(
    `http://localhost:8080/api/appointments/appointmentsView/byClientId/${id}`,
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
      { message: 'could not fetch appointments' },
      { status: response.status }
    )
  }

  const responseData = await response.json()
  return responseData
}

export const fetchClientAppointmentsByDate = async (
  clientId: number,
  selectedDate: string
) => {
  const jwt = getJwt()
  if (!jwt) {
    return
  }
  const response = await fetch(
    `http://localhost:8080/api/appointments/byClient/${clientId}?date=${selectedDate}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }
  )
  if (!response.ok) {
    throw new Error('There was an error fetching client appointments')
  }
  if (response.status === 204) {
    return []
  }
  const data = await response.json()

  const isoStrings = data.map(
    (appointment: { startTime: string; endTime: string }) => {
      return {
        startTime: appointment.startTime,
        endTime: appointment.endTime,
      }
    }
  )

  return isoStrings
}

export const fetchStylistAppointmentsByDate = async (
  selectedStylistId: number,
  selectedDate: string
) => {
  const jwt = getJwt()
  if (!jwt) {
    return
  }
  const response = await fetch(
    `http://localhost:8080/api/appointments/byStylist/${selectedStylistId}?date=${selectedDate}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }
  )
  if (!response.ok) {
    throw new Error('There was an error fetching stylist appointments')
  }
  if (response.status === 204) {
    return []
  }
  const data = await response.json()

  const isoStrings = data.map(
    (appointment: { startTime: string; endTime: string }) => {
      return {
        startTime: appointment.startTime,
        endTime: appointment.endTime,
      }
    }
  )

  return isoStrings
}

//generate UTC timestamps from 13:00 - 21:00
//8:00am - 4:00pm EST
//in 15 minute intervals
const generateAppointmentTimes = (date: Date): string[] => {
  const appointmentTimes: string[] = []
  date.setUTCHours(13, 0, 0, 0) //8:00am EST

  for (let i = 0; i < 32; i++) {
    const time = new Date(date.getTime() + i * 15 * 60 * 1000)
    appointmentTimes.push(time.toISOString())
  }

  return appointmentTimes
}

//filter out booked appointment times
//and return times in local time
export const generateAvailableAppointmentTimes = async (
  stylistId: number,
  selectedDate: string,
  clientId?: number
): Promise<string[]> => {
  try {
    let clientAppointments = []
    if (clientId) {
      clientAppointments = await fetchClientAppointmentsByDate(
        clientId,
        selectedDate
      )
    }

    const stylistAppointments = await fetchStylistAppointmentsByDate(
      stylistId,
      selectedDate
    )

    const allAppointmentTimes = generateAppointmentTimes(new Date(selectedDate))

    //filter booked client times
    const filteredClientTimes = filterAppointmentTimes(
      allAppointmentTimes,
      clientAppointments
    )

    //filter booked stylist times
    const filteredStylistTimes = filterAppointmentTimes(
      filteredClientTimes,
      stylistAppointments
    )

    //convert remaining appointment times
    //to HH:mm format
    const localTimes = filteredStylistTimes.map((isoString) => {
      const timeDate = new Date(isoString)
      return timeDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    })
    return localTimes
  } catch (error) {
    throw new Error(
      `There was an error generating available appointment times: ${error}`
    )
  }
}

interface AppointmentTimes {
  startTime: string
  endTime: string
}

//helper method to filter out booked appointment times
const filterAppointmentTimes = (
  appointmentTimesList: string[],
  appointments: AppointmentTimes[]
): string[] => {
  let filteredAppointmentTimes: string[] = [...appointmentTimesList]

  appointments.forEach((appointment) => {
    const { startTime, endTime } = appointment
    const startDateTime = new Date(startTime).getTime()
    const endDateTime = new Date(endTime).getTime()

    filteredAppointmentTimes = filteredAppointmentTimes.filter((time) => {
      const timeDate = new Date(time).getTime()
      return timeDate < startDateTime || timeDate >= endDateTime
    })
  })

  return filteredAppointmentTimes
}

export const getFormattedDate = (timestamp: string): string => {
  const date = new Date(timestamp)
  const year = date.getUTCFullYear()
  const month = `0${date.getUTCMonth() + 1}`.slice(-2)
  const day = `0${date.getUTCDate()}`.slice(-2)

  return `${year}-${month}-${day}`
}

export const getFormattedLocalTime = (timestamp: string): string => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

const formatUTCDate = (
  date: FormDataEntryValue | null,
  time: FormDataEntryValue | null
): string => {
  const placeholderDate = new Date('1978-04-13 ' + time)
  const formattedTime = placeholderDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const dateTimeString = `${date}T${formattedTime}:00`
  const resultDate = new Date(dateTimeString)
  return resultDate.toISOString()
}

export const appointmentReportViewLoader = async () => {
  const jwt = getJwt()
  if (jwt === null) {
    return
  }
  const response = await fetch(
    'http://localhost:8080/api/reports/appointmentsReport',
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
      { message: 'could not fetch appointments' },
      { status: response.status }
    )
  }

  return await response.json()
}

export const isAppointmentConflict = (
  appointmentTimes: AppointmentTimes[],
  date: string,
  startTime: string,
  endTime: string
): boolean => {
  const selectedStartTime = new Date(`${date}T${startTime}`)
  const selectedEndTime = new Date(`${date}T${endTime}`)

  for (const appt of appointmentTimes) {
    const apptStart = new Date(appt.startTime)
    const apptEnd = new Date(appt.endTime)

    if (
      (selectedStartTime >= apptStart && selectedStartTime < apptEnd) ||
      (selectedEndTime > apptStart && selectedEndTime <= apptEnd) ||
      (selectedStartTime <= apptStart && selectedEndTime >= apptEnd)
    ) {
      return true
    }
  }
  return false
}
