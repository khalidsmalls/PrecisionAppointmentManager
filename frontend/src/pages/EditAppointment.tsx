import { useRouteLoaderData } from 'react-router-dom'
//import { Appointment } from '../types/Appointment'
import AppointmentView from '../types/AppointmentView'
import AppointmentForm from '../components/AppointmentForm'

const EditAppointment = () => {
  const appointment = useRouteLoaderData(
    'appointment-detail'
  ) as AppointmentView
  return (
    <>
      <div className='mb-3'>
        <h1 className='display-5 text-secondary'>Modify Appointment</h1>
      </div>
      <AppointmentForm method={'PUT'} appointment={appointment} />
    </>
  )
}

export default EditAppointment
