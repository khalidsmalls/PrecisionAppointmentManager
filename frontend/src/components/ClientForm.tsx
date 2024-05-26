import {
  useNavigate,
  useNavigation,
  useActionData,
  Form,
} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'
import FormGroup from 'react-bootstrap/FormGroup'
import { RefObject, useRef, useEffect } from 'react'
import { Client } from '../types/Client'
import { getUser } from '../utils/authFunctions'

interface Errors {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

const ClientForm = ({
  method,
  client,
}: {
  method: 'POST' | 'PUT'
  client?: Client
}) => {
  const errors = useActionData() as Errors
  const firstNameRef: RefObject<HTMLInputElement> = useRef(null)
  const navigation = useNavigation()
  const navigate = useNavigate()
  const isSubmitting = navigation.state === 'submitting'
  const user = getUser()

  useEffect(() => {
    if (firstNameRef.current) {
      firstNameRef.current.focus()
    }
  }, [])

  return (
    <Row className='ms-3 justify-content-center'>
      <Col md={10}>
        <Form className='p-3' method={method}>
          {client && (
            <Row className='mb-lg-2 mb-xl-3'>
              <Col xs={12} lg={6} className='mb-3'>
                <FormGroup>
                  <Row>
                    <Col
                      xs={12}
                      md={3}
                      lg={4}
                      xl={3}
                      className='justify-content-center pe-0 pe-lg-2 me-lg-2'
                    >
                      <FormLabel htmlFor='id'>Client Id</FormLabel>
                    </Col>
                    <Col xs={9} md={7} lg={9} xl={7} className='ps-0'>
                      <FormControl
                        id='id'
                        type='text'
                        name='id'
                        readOnly
                        disabled
                        defaultValue={client.clientId}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          )}
          <Row className='mb-lg-2 mb-xl-3'>
            <Col xs={12} lg={6} className='mb-3'>
              <FormGroup>
                <Row>
                  <Col
                    xs={12}
                    md={3}
                    lg={4}
                    xl={3}
                    className='justify-content-center pe-0 pe-lg-2 me-lg-2'
                  >
                    <FormLabel htmlFor='firstName'>First Name</FormLabel>
                  </Col>
                  <Col xs={9} md={7} lg={9} xl={7} className='ps-0'>
                    <FormControl
                      id='firstName'
                      name='firstName'
                      ref={firstNameRef}
                      required
                      defaultValue={client ? client.firstName : ''}
                    />
                  </Col>
                  {errors && errors.firstName && (
                    <Col xs={12}>
                      <p className='text-danger'>{errors.firstName}</p>
                    </Col>
                  )}
                </Row>
              </FormGroup>
            </Col>
            <Col xs={12} lg={6} className='mb-3'>
              <FormGroup>
                <Row>
                  <Col
                    xs={12}
                    md={3}
                    lg={4}
                    xl={3}
                    className='justify-content-center pe-0 pe-lg-2 me-lg-2'
                  >
                    <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                  </Col>
                  <Col xs={9} md={7} lg={9} xl={7} className='ps-0'>
                    <FormControl
                      id='lastName'
                      name='lastName'
                      required
                      defaultValue={client ? client.lastName : ''}
                    />
                  </Col>
                </Row>
                {errors && errors.lastName && (
                  <Col xs={12}>
                    <p className='text-danger'>{errors.lastName}</p>
                  </Col>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row mb-2>
            <Col xs={12} lg={6} className='mb-3'>
              <FormGroup>
                <Row>
                  <Col
                    xs={12}
                    md={3}
                    lg={4}
                    xl={3}
                    className='justify-content-center pe-0 pe-lg-2 me-lg-2'
                  >
                    <FormLabel htmlFor='email'>Email</FormLabel>
                  </Col>
                  <Col xs={9} md={7} lg={9} xl={7} className='ps-0'>
                    <FormControl
                      id='email'
                      type='email'
                      name='email'
                      required
                      defaultValue={client ? client.email : ''}
                    />
                  </Col>
                  {errors && errors.email && (
                    <Col xs={12}>
                      <p className='text-danger'>{errors.email}</p>
                    </Col>
                  )}
                </Row>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Row>
                  <Col
                    xs={12}
                    md={3}
                    lg={4}
                    xl={3}
                    className='justify-content-center pe-0 pe-lg-2 me-lg-2'
                  >
                    <FormLabel htmlFor='phone'>Phone</FormLabel>
                  </Col>
                  <Col xs={9} md={7} lg={9} xl={7} className='ps-0'>
                    <FormControl
                      id='phone'
                      type='tel'
                      name='phone'
                      required
                      defaultValue={client ? client.phone : ''}
                    />
                  </Col>
                  {errors && errors.phone && (
                    <Col xs={12}>
                      <p className='text-danger'>{errors.phone}</p>
                    </Col>
                  )}
                </Row>
              </FormGroup>
            </Col>
          </Row>

          <input type='hidden' name='userId' value={user?.userId} />

          <div className='mx-2 mt-3 d-grid gap-2 d-md-flex justify-content-md-end me-md-5 pe-md-5'>
            <Button
              className='btn-block btn-md-inline'
              onClick={() => navigate('..')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>{' '}
            <Button
              className='btn-block btn-md-inline'
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Save'}
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  )
}

export default ClientForm
