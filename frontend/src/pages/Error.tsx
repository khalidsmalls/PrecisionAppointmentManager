import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import PageContent from '../components/PageContent'
import { Container } from 'react-bootstrap'
import MainNavigation from '../components/MainNavigation'
import { useState } from 'react'
import Footer from '../components/Footer'
import MainHeading from '../components/MainHeading'

const Error = () => {
  const error = useRouteError()
  let title = 'An error has occured!'
  let message = 'Something went wrong!'
  const [logoutError, setLogoutError] = useState<string | null>(null)

  const handleLogoutError = (error: Error) => {
    setLogoutError(`A logout error occurred: ${error}`)
  }

  if (isRouteErrorResponse(error)) {
    if (error.status === 500 || error.status === 422 || error.status === 400) {
      message = error.data.message
    } else if (error.status === 404) {
      title = 'The selected URL could not be found'
      message = error.data.message
    }
  }

  return (
    <Container
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <MainNavigation onLogoutError={handleLogoutError} />
      <div className='my-4'>
        <MainHeading />
      </div>
      <div className='mb-4 p-2 d-flex justify-content-center'>
        {logoutError && (
          <div>
            <h4 className='text-danger'>{`An error occured: ${logoutError}`}</h4>
          </div>
        )}
        <PageContent title={title}>{message}</PageContent>
      </div>
      <Footer />
    </Container>
  )
}

export default Error
