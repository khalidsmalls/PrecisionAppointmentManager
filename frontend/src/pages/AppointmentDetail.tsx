import AppointmentView from '../types/AppointmentView'
import { useRouteLoaderData } from 'react-router-dom'
import AppointmentCard from '../components/AppointmentCard'

const AppointmentDetail = () => {
  const appointment = useRouteLoaderData('appointment-detail') as AppointmentView

  return (
    <>
      {appointment ? (
        <>
          <AppointmentCard appointment={appointment} />
        </>
      ) : (
        <>
          <p>Loading ...</p>
        </>
      )}
    </>
  )
}

export default AppointmentDetail
