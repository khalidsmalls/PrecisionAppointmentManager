import { StylistReportView } from '../types/StylistReportView'

const StylistReportViewRecord = ({ record }: { record: StylistReportView }) => {
  const appointmentStartDate = new Date(record.startTime)
  const date = appointmentStartDate.toLocaleDateString()
  const startTime = appointmentStartDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  return (
    <div key={record.appointmentId} style={{ whiteSpace: 'nowrap' }}>
      <span style={{ minWidth: '10rem', display: 'inline-block' }}>
        {record.appointmentId}
      </span>
      <span style={{ minWidth: '10rem', display: 'inline-block' }}>
        {record.title}
      </span>
      <span style={{ minWidth: '14rem', display: 'inline-block' }}>
        {record.stylist}
      </span>
      <span style={{ minWidth: '14rem', display: 'inline-block' }}>
        {record.client}
      </span>
      <span style={{ minWidth: '15rem', display: 'inline-block' }}>
        <span
          style={{
            width: '16rem',
            display: 'inline-block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {record.description}
        </span>
      </span>
      <span style={{ minWidth: '11rem', display: 'inline-block' }}>{date}</span>
      <span style={{ minWidth: '8rem', display: 'inline-block' }}>
        {startTime}
      </span>
    </div>
  )
}

export default StylistReportViewRecord
