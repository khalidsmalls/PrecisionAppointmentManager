import { useRouteLoaderData } from 'react-router-dom'
import AppointmentViewRecordsList from '../components/AppointmentViewRecordsList'
import AppointmentView from '../types/AppointmentView'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const Appointments = () => {
  const appointments = useRouteLoaderData('appointments') as AppointmentView[]
  const navigate = useNavigate()
  return (
    <div className='p-3'>
      <div className='my-3'>
        <h1 className='display-5 text-secondary'>Appointments</h1>
      </div>

      {appointments && appointments.length > 0 ? (
        <div className='my-3'>
          <AppointmentViewRecordsList list={appointments} />
        </div>
      ) : (
        <div className='mt-5 d-flex justify-content-center'>
          <p>There are currently no scheduled appointments</p>
        </div>
      )}

      <div className='mx-2 d-grid gap-2 d-md-flex justify-content-md-end me-md-5 pe-md-5'>
        <Link to='new'>
          <Button className='btn-block btn-md-inline' style={{ width: '100%' }}>
            New Appointment
          </Button>
        </Link>
        <Button
          className='btn-block btn-md-inline'
          onClick={() => navigate('..')}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default Appointments
