import { useState } from 'react'
import { StylistReportView } from '../types/StylistReportView'
import StylistReportViewHeader from './StylistReportViewHeader'
import StylistReportViewRecord from './StylistReportViewRecord'
import { StylistReportSorts } from '../types/Sorts'
import { sortBy } from 'lodash'

const StylistReportViewRecordList = ({
  list,
}: {
  list: StylistReportView[]
}) => {
  const [sort, setSort] = useState({ sortKey: 'NONE', isReverse: false })

  const handleSort = (sortKey: string) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse
    setSort({ sortKey, isReverse })
  }

  const SORTS: StylistReportSorts = {
    NONE: (list: StylistReportView[]) => list,
    APPOINTMENT_ID: (list: StylistReportView[]) =>
      sortBy(list, 'appointmentId'),
    CLIENT_ID: (list: StylistReportView[]) => sortBy(list, 'clientId'),
    CLIENT: (list: StylistReportView[]) => sortBy(list, 'client'),
    STYLIST: (list: StylistReportView[]) => sortBy(list, 'stylist'),
  }

  const sortFunction = SORTS[sort.sortKey]
  const sortedList = sort.isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list)

  return (
    <>
      <h1 className='mb-5 display-5 text-secondary'>Stylist Report</h1>
      <div style={{ overflowX: 'auto' }}>
        <StylistReportViewHeader onSort={handleSort} />
        <hr />
        {sortedList.map((item) => (
          <StylistReportViewRecord key={item.appointmentId} record={item} />
        ))}
      </div>
    </>
  )
}

export default StylistReportViewRecordList
