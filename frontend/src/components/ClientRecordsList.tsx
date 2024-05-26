import { Client } from '../types/Client'
import ClientRecord from './ClientRecord'
import ClientListHeader from './ClientListHeader'
import { useState } from 'react'
import { sortBy } from 'lodash'
import { ClientSorts } from '../types/Sorts'

const ClientRecordsList = ({ list }: { list: Client[] }) => {
  const [sort, setSort] = useState({ sortKey: 'NONE', isReverse: false })

  const handleSort = (sortKey: string) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse
    setSort({ sortKey, isReverse })
  }

  const SORTS: ClientSorts = {
    NONE: (list: Client[]) => list,
    CLIENT_ID: (list: Client[]) => sortBy(list, 'clientId'),
    FIRSTNAME: (list: Client[]) => sortBy(list, 'firstName'),
    LASTNAME: (list: Client[]) => sortBy(list, 'lastName'),
  }

  const sortFunction = SORTS[sort.sortKey]
  const sortedList = sort.isReverse 
    ? sortFunction(list).reverse()
    : sortFunction(list)

  return (
    <div style={{ overflowX: 'auto' }}>
      <div className='mb-3'>
        <ClientListHeader onSort={handleSort} />
      </div>
      <hr />
      {sortedList.map((client: Client) => (
        <ClientRecord key={client.clientId} client={client} />
      ))}
    </div>
  )
}
export default ClientRecordsList
