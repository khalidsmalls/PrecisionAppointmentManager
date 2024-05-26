import { StylistAggregateReportView } from '../types/StylistAggregateReportView'

const StylistAggregateReportViewRecord = ({
  record,
}: {
  record: StylistAggregateReportView
}) => {
  return (
    <div key={record.stylistId} style={{ whiteSpace: 'nowrap' }}>
      <span style={{ minWidth: '7rem', display: 'inline-block' }}>
        {record.stylistId}
      </span>
      <span style={{ minWidth: '15rem', display: 'inline-block' }}>
        {record.stylist}
      </span>
      <span style={{ minWidth: '15rem', display: 'inline-block' }}>
        {record.totalAppointments}
      </span>
    </div>
  )
}

export default StylistAggregateReportViewRecord
