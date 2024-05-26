import Button from 'react-bootstrap/Button'

const ClientListHeader = ({
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
        }}
      >
        <Button
          type='button'
          variant='link'
          className='text-info'
          style={{ textDecoration: 'none', fontWeight: 'bold', padding: 0 }}
          onClick={() => onSort('FIRSTNAME')}
        >
          First Name
        </Button>
      </span>
      <span
        style={{
          minWidth: '10rem',
          display: 'inline-block',
        }}
      >
        <Button
          type='button'
          variant='link'
          className='text-info'
          style={{ textDecoration: 'none', fontWeight: 'bold', padding: 0 }}
          onClick={() => onSort('LASTNAME')}
        >
          Last Name
        </Button>
      </span>
      <span
        style={{
          minWidth: '16rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Email
      </span>
      <span
        style={{
          minWidth: '13rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Phone
      </span>
    </div>
  )
}

export default ClientListHeader
