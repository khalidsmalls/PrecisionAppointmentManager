import { Form, useActionData } from 'react-router-dom'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { RefObject, useRef, useEffect } from 'react'
import { useNavigation } from 'react-router-dom'

interface Errors {
  username?: string
  password?: string
}

const NewUser = () => {
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
    <div className='row justify-content-center'>
      <div className='text-secondary col-5 col-md-4 col-lg-2'>
        {defaultAuthError && <p>{defaultAuthError}</p>}
        <h1 className='display-5'>New User</h1>

        <Form method='post'>
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
          </FormGroup>
          {errors && errors.password && (
            <p className='text-danger'>{errors.password}</p>
          )}

          <Button
            className='mt-3'
            variant='primary'
            as='button'
            type='submit'
            size='lg'
          >
            {isSubmitting ? 'submitting ...' : 'Submit'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default NewUser
