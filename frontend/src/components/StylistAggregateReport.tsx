import { useLoaderData } from 'react-router-dom'
import StylistAggregateReportViewRecordList from './StylistAggregateReportViewRecordList'
import { StylistAggregateReportView } from '../types/StylistAggregateReportView'

const StylistAggregateReport = () => {
  const report = useLoaderData() as StylistAggregateReportView[]

  return (
    <>
      <div className='mb-3'>
        <h1 className='display-5 text-secondary'>Stylist Aggregate Report</h1>
      </div>
      <StylistAggregateReportViewRecordList list={report} />
    </>
  )
}

export default StylistAggregateReport
