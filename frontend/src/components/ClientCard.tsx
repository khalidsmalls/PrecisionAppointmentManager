import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { Client } from '../types/Client'
import { useSubmit } from 'react-router-dom'
import { getAuthorities, getUser } from '../utils/authFunctions'

const ClientCard = ({ client }: { client: Client }) => {
  const submit = useSubmit()
  const user = getUser()
  const authorities = getAuthorities()
  const canEditOrDelete =
    user?.userId === client.userId || authorities?.includes('ADMIN')

  const handleDeleteClient = () => {
    const proceed = window.confirm(
      `Are you sure you would like to delete
       ${client.firstName} ${client.lastName}
       and his/her scheduled appointments?`
    )
    if (proceed) {
      submit(null, { method: 'DELETE', action: `/clients/${client.clientId}` })
    }
  }

  return (
    <Row>
      <Col xs={12} sm={10} md={7} lg={6} xl={4}>
        <Card className='p-2'>
          <Row>
            <Col>
              <Card.Body>
                <Row>
                  <Col className='mb-2 text-secondary'>
                    <Card.Title>
                      <h3>
                        {client.firstName} {client.lastName}
                      </h3>
                    </Card.Title>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Card.Text>{client.email}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Card.Text>{client.phone}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-2'>
                    {!canEditOrDelete ? (
                      <span className='text-muted'>Edit</span>
                    ) : (
                      <Link to='edit' style={{ textDecoration: 'none' }}>
                        Edit
                      </Link>
                    )}
                  </Col>
                  <Col xs={12}>
                    <Button
                      onClick={handleDeleteClient}
                      disabled={!canEditOrDelete}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default ClientCard
