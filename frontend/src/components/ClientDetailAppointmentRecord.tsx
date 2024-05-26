import { ClientDetailAppointment } from '../types/ClientDetailAppointment'
import { Link } from 'react-router-dom'

const ClientDetailAppointmentRecord = ({
  appointment,
}: {
  appointment: ClientDetailAppointment
}) => {
  const appointmentStartDateTime = new Date(appointment.startTime)
  const appointmentEndDateTime = new Date(appointment.endTime)
  const date = appointmentStartDateTime.toLocaleDateString()
  const startTime = appointmentStartDateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  const endTime = appointmentEndDateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  return (
    <div key={appointment.appointmentId} style={{ whiteSpace: 'nowrap' }}>
      <Link
        style={{
          minWidth: '10rem',
          display: 'inline-block',
          textDecoration: 'none',
        }}
        to={`/appointments/${appointment.appointmentId}`}
      >
        <span>{appointment.appointmentId}</span>
      </Link>
      <span style={{ minWidth: '7rem', display: 'inline-block' }}>
        {appointment.title}
      </span>
      <span style={{ minWidth: '13rem', display: 'inline-block' }}>
        <span
          style={{
            width: '12rem',
            display: 'inline-block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {appointment.description}
        </span>
      </span>
      <span style={{ minWidth: '13rem', display: 'inline-block' }}>
        {appointment.stylist}
      </span>
      <span style={{ minWidth: '9rem', display: 'inline-block' }}>{date}</span>
      <span style={{ minWidth: '9rem', display: 'inline-block' }}>
        {startTime}
      </span>
      <span style={{ minWidth: '9rem', display: 'inline-block' }}>
        {endTime}
      </span>
    </div>
  )
}

export default ClientDetailAppointmentRecord
