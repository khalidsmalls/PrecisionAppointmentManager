import { useSubmit } from 'react-router-dom'
import AppointmentView from '../types/AppointmentView'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { getUser, getAuthorities } from '../utils/authFunctions'

const AppointmentCard = ({ appointment }: { appointment: AppointmentView }) => {
  const submit = useSubmit()
  const user = getUser()
  const authorities = getAuthorities()
  const canEditOrDelete =
    user?.userId === appointment.userId || authorities?.includes('ADMIN')
  const appointmentStartDate = new Date(appointment.startTime)
  const date = appointmentStartDate.toLocaleDateString()
  const startTime = appointmentStartDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  const endTime = new Date(appointment.endTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  const handleDeleteAppointment = () => {
    const proceed = window.confirm(
      `Are you sure you would like to delete the appointment?`
    )
    if (proceed) {
      submit(null, {
        method: 'DELETE',
        action: `/appointments/${appointment.appointmentId}`,
      })
    }
  }

  return (
    <Row>
      <Col xs={12} sm={10} md={7} lg={6} xl={4}>
        <Card className='p-2'>
          <Card.Body>
            <Row>
              <Col>
                <Row>
                  <Col className='mb-2'>
                    <Card.Title>
                      <span>
                        <strong>Appointment Id: </strong>
                      </span>
                      <span>{appointment.appointmentId}</span>
                    </Card.Title>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-2 text-secondary'>
                    <Card.Text>
                      <h3>{appointment.client}</h3>
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Text>{date}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Card.Text>{`${startTime} - ${endTime}`}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Card.Text>
                      <span>
                        <strong>Stylist: </strong>
                      </span>
                      <span>{appointment.stylist}</span>
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Card.Text>
                      <span>
                        <strong>Description: </strong>
                      </span>
                      <span>{appointment.description}</span>
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-2'>
                    <Card.Text>
                      <span>
                        <strong>User: </strong>
                      </span>
                      <span>{appointment.username}</span>
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-2'>
                    {!canEditOrDelete ? (
                      <span className='text-muted'>Edit</span>
                    ) : (
                      <Link style={{ textDecoration: 'none' }} to='edit'>
                        Edit
                      </Link>
                    )}
                  </Col>
                  <Col xs={12}>
                    <Button
                      onClick={handleDeleteAppointment}
                      disabled={!canEditOrDelete}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default AppointmentCard
