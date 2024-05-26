import Button from 'react-bootstrap/Button'

const AppointmentViewHeader = ({
  onSort,
}: {
  onSort: (sortKey: string) => void
}) => {
  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      <span
        style={{
          minWidth: '9rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        <Button
          type='button'
          variant='link'
          className='text-info'
          style={{ textDecoration: 'none', fontWeight: 'bold', padding: 0 }}
          onClick={() => onSort('APPOINTMENT_ID')}
        >
          Appointment Id
        </Button>
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
          minWidth: '10rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Description
      </span>
      <span
        style={{
          minWidth: '6rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        <Button
          type='button'
          variant='link'
          className='text-info'
          style={{ textDecoration: 'none', fontWeight: 'bold', padding: 0 }}
          onClick={() => onSort('CLIENT_ID')}
        >
          Client Id
        </Button>
      </span>
      <span
        style={{
          minWidth: '10rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        <Button
          type='button'
          variant='link'
          className='text-info'
          style={{ textDecoration: 'none', fontWeight: 'bold', padding: 0 }}
          onClick={() => onSort('CLIENT')}
        >
          Client
        </Button>
      </span>
      <span
        style={{
          minWidth: '13rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Client Email
      </span>
      <span
        style={{
          minWidth: '10rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Client Phone
      </span>
      <span
        style={{
          minWidth: '10rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        <Button
          type='button'
          variant='link'
          className='text-info'
          style={{ textDecoration: 'none', fontWeight: 'bold', padding: 0 }}
          onClick={() => onSort('STYLIST')}
        >
          Stylist
        </Button>
      </span>
      <span
        style={{
          minWidth: '7rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Date
      </span>
      <span
        style={{
          minWidth: '6rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Start Time
      </span>
      <span
        style={{
          minWidth: '6rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        End Time
      </span>
      <span
        style={{
          minWidth: '6rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Username
      </span>
    </div>
  )
}

export default AppointmentViewHeader
