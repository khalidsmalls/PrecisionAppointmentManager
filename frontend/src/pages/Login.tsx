import { useRef, RefObject, useEffect } from 'react'
import { useActionData, useNavigation, Form } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'
import FormGroup from 'react-bootstrap/FormGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

interface Errors {
  username?: string
  password?: string
}

const Login = () => {
  const errors = useActionData() as Errors
  const defaultAuthError = typeof errors === 'string' ? errors : undefined
  const usernameRef: RefObject<HTMLInputElement> = useRef(null)
  const navigation = useNavigation()

  const isSubmitting = navigation.state === 'submitting'

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus()
    }
  }, [])

  return (
    <Row className='row justify-content-center'>
      <Col xs={7} sm={5} md={4} lg={3} className='text-secondary'>
        <Row>
          <Col xs={12}>
            {defaultAuthError && <p>{defaultAuthError}</p>}
            <div>
              <h1 className='display-4'>Sign In</h1>
            </div>
          </Col>

          <Col>
            <Form method='post'>
              <Row>
                <Col xs={11} xl={9} xxl={8}>
                  <FormGroup>
                    <FormLabel htmlFor='username' className='mt-2'>
                      username:
                    </FormLabel>
                    <FormControl
                      id='username'
                      name='username'
                      ref={usernameRef}
                      autoComplete='off'
                      required
                    />
                    {errors && errors.username && (
                      <p className='text-danger'>{errors.username}</p>
                    )}
                  </FormGroup>
                </Col>

                <Col xs={11} xl={9} xxl={8}>
                  <FormGroup>
                    <FormLabel htmlFor='password' className='mt-3'>
                      password:
                    </FormLabel>
                    <FormControl
                      type='password'
                      id='password'
                      name='password'
                      required
                    />
                    {errors && errors.password && (
                      <p className='text-danger'>{errors.password}</p>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <div>
                <Button
                  className='mt-3'
                  variant='primary'
                  as='button'
                  type='submit'
                  size='lg'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'submitting ...' : 'Sign In'}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Login
