import ClientDetailAppointmentRecord from './ClientDetailAppointmentRecord'
import { ClientDetailAppointment } from '../types/ClientDetailAppointment'
import ClientDetailAppointmentListHeader from './ClientDetailAppointmentRecordListHeader'

const ClientAppointmentList = ({
  list,
}: {
  list: ClientDetailAppointment[]
}) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <ClientDetailAppointmentListHeader />
      <hr />
      {list.map((item) => (
        <ClientDetailAppointmentRecord
          key={item.appointmentId}
          appointment={item}
        />
      ))}
    </div>
  )
}
export default ClientAppointmentList
