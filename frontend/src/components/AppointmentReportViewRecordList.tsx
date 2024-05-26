import AppointmentReportView from '../types/AppointmentReportView'
import AppointmentReportViewRecord from './AppointmentReportViewRecord'
import AppointmentReportViewHeader from './AppointmentReportViewHeader'
import { useState } from 'react'
import { sortBy } from 'lodash'
import { AppointmentReportSorts } from '../types/Sorts'

const AppointmentReportViewRecordList = ({
  list,
}: {
  list: AppointmentReportView[]
}) => {
  const [sort, setSort] = useState({ sortKey: 'NONE', isReverse: false })

  const handleSort = (sortKey: string) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse
    setSort({ sortKey, isReverse })
  }

  const SORTS: AppointmentReportSorts = {
    NONE: (list: AppointmentReportView[]) => list,
    APPOINTMENT_ID: (list: AppointmentReportView[]) =>
      sortBy(list, 'appointmentId'),
    CLIENT_ID: (list: AppointmentReportView[]) => sortBy(list, 'clientId'),
    CLIENT: (list: AppointmentReportView[]) => sortBy(list, 'client'),
    STYLIST_ID: (list: AppointmentReportView[]) => sortBy(list, 'stylistId'),
    STYLIST: (list: AppointmentReportView[]) => sortBy(list, 'stylist'),
  }

  const sortFunction = SORTS[sort.sortKey]
  const sortedList = sort.isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list)

  return (
    <div style={{ overflowX: 'auto' }}>
      <AppointmentReportViewHeader onSort={handleSort} />
      <hr />
      {sortedList.map((item) => (
        <AppointmentReportViewRecord
          key={item.appointmentId}
          appointment={item}
        />
      ))}
    </div>
  )
}

export default AppointmentReportViewRecordList
