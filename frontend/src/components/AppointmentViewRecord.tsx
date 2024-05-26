import AppointmentView from '../types/AppointmentView'
import { Link } from 'react-router-dom'

const AppointmentViewRecord = ({
  appointment,
}: {
  appointment: AppointmentView
}) => {
  const appointmentStartDate = new Date(appointment.startTime)
  const date = appointmentStartDate.toLocaleDateString()
  const startTime = appointmentStartDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  const endTime = new Date(appointment.endTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  return (
    <div key={appointment.appointmentId} style={{ whiteSpace: 'nowrap' }}>
      <Link
        style={{
          minWidth: '9rem',
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
      <span style={{ minWidth: '10rem', display: 'inline-block' }}>
        <span
          style={{
            width: '9rem',
            display: 'inline-block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {appointment.description}
        </span>
      </span>
      <span style={{ minWidth: '6rem', display: 'inline-block' }}>
        {appointment.clientId}
      </span>
      <span style={{ minWidth: '10rem', display: 'inline-block' }}>
        {appointment.client}
      </span>
      <span style={{ minWidth: '13rem', display: 'inline-block' }}>
        {appointment.clientEmail}
      </span>
      <span style={{ minWidth: '10rem', display: 'inline-block' }}>
        {appointment.clientPhone}
      </span>
      <span style={{ minWidth: '10rem', display: 'inline-block' }}>
        {appointment.stylist}
      </span>
      <span style={{ minWidth: '7rem', display: 'inline-block' }}>{date}</span>
      <span style={{ minWidth: '6rem', display: 'inline-block' }}>
        {startTime}
      </span>
      <span style={{ minWidth: '6rem', display: 'inline-block' }}>
        {endTime}
      </span>
      <span style={{ minWidth: '6rem', display: 'inline-block' }}>
        {appointment.username}
      </span>
    </div>
  )
}

export default AppointmentViewRecord
