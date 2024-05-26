import AppointmentViewRecordsList from '../components/AppointmentViewRecordsList'
import { useLoaderData } from 'react-router-dom'
import AppointmentView from '../types/AppointmentView'
import { getUser } from '../utils/authFunctions'
import { useEffect, useState } from 'react'

const Home = () => {
  const appointments = useLoaderData() as AppointmentView[] | null
  const user = getUser()
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  useEffect(() => {
    setCurrentDateTime(new Date())
  }, [])

  return (
    <>
      <div className='ms-3 ps-3'>
        <h1 className='display-4 text-secondary'>Home</h1>
      </div>
      <div className='ms-3 ps-3 mt-2 mb-3'>
        {user && <h3 className='text-secondary'>Welcome, {user?.username}</h3>}
        <p>{currentDateTime.toLocaleString()}</p>
      </div>
      {appointments && appointments.length > 0 ? (
        <div className='mt-4'>
          <div>
            <h2>Upcoming Appointments</h2>
          </div>
          <div>
            <AppointmentViewRecordsList list={appointments} />
          </div>
        </div>
      ) : (
        <div className='mt-5 d-flex justify-content-center'>
          <p>No Appointments Today</p>
        </div>
      )}
    </>
  )
}

export default Home
