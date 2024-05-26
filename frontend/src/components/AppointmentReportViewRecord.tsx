import AppointmentReportView from '../types/AppointmentReportView'

const AppointmentReportViewRecord = ({
  appointment,
}: {
  appointment: AppointmentReportView
}) => {
  const appointmentStartDate = new Date(appointment.startTime)
  const appointmentDate = appointmentStartDate.toLocaleDateString()
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
      <span style={{ minWidth: '9rem', display: 'inline-block' }}>
        {appointment.appointmentId}
      </span>
      <span style={{ minWidth: '7rem', display: 'inline-block' }}>
        {appointment.title}
      </span>
      <span style={{ minWidth: '12rem', display: 'inline-block' }}>
        <span
          style={{
            width: '11rem',
            display: 'inline-block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {appointment.description}
        </span>
      </span>
      <span style={{ minWidth: '6rem', display: 'inline-block' }}>
        {appointment.stylistId}
      </span>
      <span style={{ minWidth: '12rem', display: 'inline-block' }}>
        {appointment.stylist}
      </span>
      <span style={{ minWidth: '16rem', display: 'inline-block' }}>
        {appointment.stylistEmail}
      </span>
      <span style={{ minWidth: '10rem', display: 'inline-block' }}>
        {appointment.stylistPhone}
      </span>
      <span style={{ minWidth: '12rem', display: 'inline-block' }}>
        {appointment.client}
      </span>
      <span style={{ minWidth: '16rem', display: 'inline-block' }}>
        {appointment.clientEmail}
      </span>
      <span style={{ minWidth: '10rem', display: 'inline-block' }}>
        {appointment.clientPhone}
      </span>
      <span style={{ minWidth: '9rem', display: 'inline-block' }}>
        {appointmentDate}
      </span>
      <span style={{ minWidth: '7rem', display: 'inline-block' }}>
        {startTime}
      </span>
      <span style={{ minWidth: '7rem', display: 'inline-block' }}>
        {endTime}
      </span>
      <span style={{ minWidth: '5rem', display: 'inline-block' }}>
        {appointment.userId}
      </span>
      <span style={{ minWidth: '10rem', display: 'inline-block' }}>
        {appointment.username}
      </span>
    </div>
  )
}

export default AppointmentReportViewRecord
