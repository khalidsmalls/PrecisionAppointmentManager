import MainNavigation from '../components/MainNavigation'
import { Outlet, useNavigation } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import MainHeading from './MainHeading'
import Footer from './Footer'
import { useState } from 'react'

const Root = () => {
  const navigation = useNavigation()
  const [logoutError, setLogoutError] = useState<Error | null>(null)

  const handleLogoutError = (error: Error) => {
    setLogoutError(error)
  }

  return (
    <Container
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <MainNavigation onLogoutError={handleLogoutError} />
      <div className='my-4'>
        <MainHeading />
      </div>
      <main className='mb-4 p-2' style={{ minHeight: '50vh', flex: 1 }}>
        {navigation.state === 'loading' && <p>Loading ...</p>}
        {logoutError && (
          <div className='text-danger'>
            <h4>{logoutError.message || 'A logout error occurred'}</h4>
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </Container>
  )
}
export default Root
