import ClientForm from '../components/ClientForm'

const NewClient = () => {
  return (
    <>
      <div className='ms-3 ps-3 mb-4'>
        <h1 className='display-5 text-secondary'>New Client</h1>
      </div>
      <ClientForm method='POST' />
    </>
  )
}

export default NewClient
