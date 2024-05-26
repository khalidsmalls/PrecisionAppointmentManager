const StylistAggregateReportViewHeader = () => {
  return (
    <div style={{ whiteSpace: 'nowrap' }}> 
      <span
        style={{
          minWidth: '7rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Stylist Id
      </span>
      <span
        style={{
          minWidth: '15rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Stylist
      </span>
      <span
        style={{
          minWidth: '15rem',
          display: 'inline-block',
          fontWeight: 'bold',
        }}
      >
        Total Appointments
      </span>
    </div>
  )
}

export default StylistAggregateReportViewHeader
