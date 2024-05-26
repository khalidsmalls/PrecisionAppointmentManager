import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import { useRouteLoaderData } from 'react-router-dom'
import { getJwt } from '../utils/authFunctions'

interface auth {
  jwt: string
  authorities: string[]
}

const Footer = () => {
  const authData = useRouteLoaderData('root') as auth
  const authorities = authData.authorities
  const isAdmin = authorities
    ? authorities && authorities.includes('ADMIN')
    : false
  const jwt = getJwt()

  return (
    <footer
      className='pt-5 pb-2 bg-dark text-light'
      style={{ marginTop: 'auto' }}
    >
      <Container>
        <Row>
          <Col xs={12} lg={4} className='mb-2'>
            <Row>
              <Col xs={3} sm={2} lg={3} style={{ margin: 0, paddingRight: 0 }}>
                <img
                  src='/barber-pole-svgrepo-com.svg'
                  width='90'
                  height='90'
                  alt='Precision Logo'
                  className='d-inline-block'
                />
              </Col>
              <Col xs={6} lg={7}>
                <h3>Precision</h3>
                <h5>Barber & Styling</h5>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row className='justify-content-end'>
              <Col xs={6} md={3} lg={5} xl={3}>
                <ul style={{ listStyleType: 'none' }}>
                  <li>
                    <Link
                      className='text-light'
                      style={{ textDecoration: 'none' }}
                      to='/'
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='text-light'
                      style={{ textDecoration: 'none' }}
                      to='/clients'
                    >
                      Clients
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='text-light'
                      style={{ textDecoration: 'none' }}
                      to='/appointments'
                    >
                      Appointments
                    </Link>
                  </li>
                </ul>
              </Col>
              {jwt && isAdmin && (
                <Col xs={6} lg={5}>
                  <ul style={{ listStyleType: 'none' }}>
                    <li>
                      <Link
                        className='text-light'
                        style={{ textDecoration: 'none' }}
                        to='/reports'
                      >
                        Reports
                      </Link>
                    </li>
                    <li>
                      <Link
                        className='text-light'
                        style={{ textDecoration: 'none' }}
                        to='/users'
                      >
                        Users
                      </Link>
                    </li>
                  </ul>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
      <div className='text-center py-2'>
        <Container fluid>
          <span className='me-2'>Khalid Smalls</span>{' '}
          <span>Western Governors University 2023</span>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
