import { useRouteLoaderData } from 'react-router-dom'
import ClientForm from '../components/ClientForm'
import { Client } from '../types/Client'

const EditClient = () => {
  const client = useRouteLoaderData('client-detail') as Client

  return (
    <>
      <div className='ps-3 ms-3 my-3'>
        <h1 className='display-5 text-secondary'>Modify Client</h1>
      </div>
      <ClientForm method='PUT' client={client} />
    </>
  )
}

export default EditClient
