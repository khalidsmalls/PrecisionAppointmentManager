import { Client } from '../types/Client'
import { Link } from 'react-router-dom'

const ClientRecord = ({ client }: { client: Client }) => (
  <div key={client.clientId} style={{ whiteSpace: 'nowrap' }}>
    <Link to={`/clients/${client.clientId}`}>
      <span style={{ minWidth: '9rem', display: 'inline-block' }}>
        {client.clientId}
      </span>
    </Link>
    <span style={{ minWidth: '10rem', display: 'inline-block' }}>
      {client.firstName}
    </span>
    <span style={{ minWidth: '10rem', display: 'inline-block' }}>
      {client.lastName}
    </span>
    <span style={{ minWidth: '16rem', display: 'inline-block' }}>
      {client.email}
    </span>
    <span style={{ minWidth: '13rem', display: 'inline-block' }}>
      {client.phone}
    </span>
  </div>
)

export default ClientRecord
