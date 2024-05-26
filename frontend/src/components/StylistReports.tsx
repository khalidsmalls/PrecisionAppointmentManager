import { useLoaderData } from 'react-router-dom'
import StylistReportViewRecordList from './StylistReportViewRecordList'
import { StylistReportView } from '../types/StylistReportView'
import { Outlet } from 'react-router-dom'

const StylistReports = () => {
  const report = useLoaderData() as StylistReportView[]

  return (
    <>
      {report && report.length > 0 ? (
        <>
          <div style={{ margin: '0 auto', overflowX: 'auto' }}>
            <StylistReportViewRecordList list={report} />
          </div>
          <div className='mt-5'>
            <Outlet />
          </div>
        </>
      ) : (
        <div className='mt-5 d-flex justify-content-center'>
          <p>There are not yet any appointments to report</p>
        </div>
      )}
    </>
  )
}

export default StylistReports
