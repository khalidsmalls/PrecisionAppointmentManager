import StylistAggregateReportViewRecord from './StylistAggregateReportViewRecord'
import { StylistAggregateReportView } from '../types/StylistAggregateReportView'
import StylistAggregateReportViewHeader from './StylistAggreagateReportViewHeader'

const StylistAggregateReportViewRecordList = ({
  list,
}: {
  list: StylistAggregateReportView[]
}) => (
  <div className='mb-3' style={{ overflowX: 'auto' }}>
    <StylistAggregateReportViewHeader />
    <hr />
    {list.map((item) => (
      <StylistAggregateReportViewRecord key={item.stylistId} record={item} />
    ))}
  </div>
)

export default StylistAggregateReportViewRecordList
