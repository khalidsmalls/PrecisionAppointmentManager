import AppointmentViewRecord from './AppointmentViewRecord'
import AppointmentView from '../types/AppointmentView'
import AppointmentViewHeader from './AppointmentViewHeader'
import { useState } from 'react'
import { sortBy } from 'lodash'
import { AppointmentSorts } from '../types/Sorts'

const AppointmentViewRecordsList = ({ list }: { list: AppointmentView[] }) => {
  const [sort, setSort] = useState({ sortKey: 'NONE', isReverse: false })

  const handleSort = (sortKey: string) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse
    setSort({ sortKey, isReverse })
  }

  const SORTS: AppointmentSorts = {
    NONE: (list: AppointmentView[]) => list,
    APPOINTMENT_ID: (list: AppointmentView[]) => sortBy(list, 'appointmentId'),
    CLIENT_ID: (list: AppointmentView[]) => sortBy(list, 'clientId'),
    CLIENT: (list: AppointmentView[]) => sortBy(list, 'client'),
    STYLIST: (list: AppointmentView[]) => sortBy(list, 'stylist')
  }

  const sortFunction = SORTS[sort.sortKey]
  const sortedList = sort.isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list)

  return (
    <div style={{ overflowX: 'auto' }}>
      <div className='my-3'>
        <AppointmentViewHeader onSort={handleSort} />
      </div>
      <hr />
      {sortedList.map((item) => (
        <AppointmentViewRecord key={item.appointmentId} appointment={item} />
      ))}
    </div>
  )
}

export default AppointmentViewRecordsList
