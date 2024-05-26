import { FormCheck } from 'react-bootstrap'
import { ChangeEvent, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('appointmentsReport')
  const navigate = useNavigate()

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.id)
    setSelectedReport(event.target.id)
    navigate(`${event.target.id}`)
  }

  useEffect(() => {
    navigate(selectedReport)
  }, [navigate, selectedReport])

  return (
    <>
      <div className='d-flex justify-content-end my-3 me-5'>
        <div className='me-5'>
          <FormCheck
            type='radio'
            name='reports'
            id='appointmentsReport'
            label='Appointments Report'
            checked={selectedReport === 'appointmentsReport'}
            defaultChecked
            onChange={handleOnChange}
          />
          <FormCheck
            type='radio'
            name='reports'
            id='stylistReports'
            label='Stylist Reports'
            checked={selectedReport === 'stylistReports'}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Reports
