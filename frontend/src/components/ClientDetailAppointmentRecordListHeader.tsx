const ClientDetailAppointmentListHeader = () => {
  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      <span
        style={{
          minWidth: '10rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Appointment Id
      </span>
      <span
        style={{
          minWidth: '7rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Title
      </span>
      <span
        style={{
          minWidth: '13rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Description
      </span>
      <span
        style={{
          minWidth: '13rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Stylist
      </span>
      <span
        style={{
          minWidth: '9rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Date
      </span>
      <span
        style={{
          minWidth: '9rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Start Time
      </span>
      <span
        style={{
          minWidth: '9rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        End Time
      </span>
    </div>
  )
}

export default ClientDetailAppointmentListHeader
