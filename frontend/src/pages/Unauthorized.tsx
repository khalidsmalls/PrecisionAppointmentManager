import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate()

  return (
    <section className='row justify-content-center mt-5'>
      <div className='text-center'>
        <h1 className='display-3'>Unauthorized</h1>
        <br />
        <p>You are not authorized to view the requested page</p>
        <button className='btn btn-primary' onClick={() => navigate('/')}>
          Home
        </button>
      </div>
    </section>
  )
}

export default Unauthorized
