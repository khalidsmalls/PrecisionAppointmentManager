import AppointmentForm from '../components/AppointmentForm'

const NewAppointment = () => {
  return (
    <>
      <div className='ms-3 ps-3 mb-4'>
        <h1 className='display-5 text-secondary'>New Appointment</h1>
      </div>
      <AppointmentForm method={'POST'} />
    </>
  )
}

export default NewAppointment
