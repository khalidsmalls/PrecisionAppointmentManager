import { Button } from 'react-bootstrap'

const StylistReportViewHeader = ({
  onSort,
}: {
  onSort: (sortKey: string) => void
}) => {
  return (
    <div style={{ whiteSpace: 'nowrap' }}>
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
          onClick={() => onSort('APPOINTMENT_ID')}
        >
          Appointment Id
        </Button>
      </span>
      <span
        style={{
          minWidth: '10rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Title
      </span>
      <span
        style={{
          minWidth: '14rem',
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
          minWidth: '14rem',
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
          minWidth: '15rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Description
      </span>
      <span
        style={{
          minWidth: '11rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Date
      </span>
      <span
        style={{
          minWidth: '8rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Time
      </span>
    </div>
  )
}

export default StylistReportViewHeader
