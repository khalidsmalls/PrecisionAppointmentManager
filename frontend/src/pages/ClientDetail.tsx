import { useRouteLoaderData, json } from 'react-router-dom'
import ClientCard from '../components/ClientCard'
import { Client } from '../types/Client'
import ClientAppointmentList from '../components/ClientDetailAppointmentList'
import { useCallback, useEffect, useState } from 'react'
import { ClientDetailAppointment } from '../types/ClientDetailAppointment'
import { getJwt } from '../utils/authFunctions'

const ClientDetail = () => {
  const client = useRouteLoaderData('client-detail') as Client
  const clientId = client.clientId
  const [appointments, setAppointments] = useState<ClientDetailAppointment[]>(
    []
  )

  const fetchClientAppointments = useCallback(async () => {
    const jwt = getJwt()
    try {
      const response = await fetch(
        `http://localhost:8080/api/appointments/appointmentsView/byClientId/${clientId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      if (!response.ok) {
        throw json({ message: 'could not fetch appointments' }, { status: 500 })
      }
      const appointmentData = await response.json()
      setAppointments(appointmentData)
    } catch (error) {
      console.error(error)
    }
  }, [clientId, setAppointments])

  useEffect(() => {
    fetchClientAppointments()
  }, [fetchClientAppointments])

  return (
    <>
      <div className='my-5'>
        <ClientCard client={client} />
      </div>
      {appointments && appointments.length > 0 ? (
        <div>
          <ClientAppointmentList list={appointments} />
        </div>
      ) : (
        <div className='mt-5 d-flex justify-content-center'>
          <p>{client.firstName} currently has no scheduled appointments</p>
        </div>
      )}
    </>
  )
}

export default ClientDetail
