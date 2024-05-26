import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import {
  NavLink,
  Link,
  useRouteLoaderData,
  useNavigate,
} from 'react-router-dom'
import { getJwt } from '../utils/authFunctions'
import '/node_modules/bootstrap/dist/js/bootstrap.min.js'

interface auth {
  jwt: string
  authorities: string[]
}

const MainNavigation = ({
  onLogoutError,
}: {
  onLogoutError: (error: Error) => void
}) => {
  const authData = useRouteLoaderData('root') as auth
  const authorities = authData.authorities
  const isAdmin = authorities
    ? authorities && authorities.includes('ADMIN')
    : false
  const navigate = useNavigate()
  const jwt = getJwt()

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        localStorage.removeItem('user')
        localStorage.removeItem('jwt')
        localStorage.removeItem('authorities')

        navigate('/')
      } else {
        const err = await response.json()
        throw new Error(
          err.message || 'There was a problem logging out the user'
        )
      }
    } catch (error) {
      onLogoutError(error as Error)
    }
  }

  return (
    <Navbar expand='lg' collapseOnSelect data-bs-theme='dark' bg='dark'>
      <Container>
        <Navbar.Brand as={Link} to='/home'>
          <img
            src='/barber-pole-svgrepo-com.svg'
            width='40'
            height='40'
            alt='Precision Logo'
            className='d-inline-block align-top'
          />{' '}
          Precision
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Collapse
          id='navbar-nav'
          className='justify-content-end align-text-top'
        >
          <Nav variant='pills'>
            <Nav.Link eventKey='1' as={NavLink} to='/' end>
              Home
            </Nav.Link>
            <Nav.Link eventKey='2' as={NavLink} to='/clients' end>
              Clients
            </Nav.Link>
            <Nav.Link eventKey='3' as={NavLink} to='/appointments' end>
              Appointments
            </Nav.Link>
            {jwt && isAdmin && (
              <>
                <Nav.Link eventKey='4' as={NavLink} to='/reports'>
                  Reports
                </Nav.Link>
                <Nav.Link as={NavLink} to='/users'>
                  Users
                </Nav.Link>
              </>
            )}
            {jwt ? (
              <Nav.Link eventKey='6' onClick={handleLogout}>
                Sign Out
              </Nav.Link>
            ) : (
              <Nav.Link eventKey='7' as={NavLink} to='/login'>
                Sign In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MainNavigation
