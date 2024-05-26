import { useLoaderData } from 'react-router-dom'
import AppointmentReportViewRecordList from './AppointmentReportViewRecordList'
import AppointmentReportView from '../types/AppointmentReportView'

const AppointmentReport = () => {
  const appointments = useLoaderData() as AppointmentReportView[]

  return (
    <>
      <div>
        <h1 className='mb-5 display-5 text-secondary'>Appointment Report</h1>
      </div>
      
      {appointments && appointments.length > 0 ? (
        <div style={{ margin: '0 auto', overflowX: 'auto' }}>
          <AppointmentReportViewRecordList list={appointments} />
        </div>
      ) : (
        <div className='mt-5 d-flex justify-content-center'>
          <p>There are not yet any appointments to report</p>
        </div>
      )}

    </>
  )
}

export default AppointmentReport
