import { useLoaderData } from 'react-router-dom'
import { UserDTO } from '../types/AuthContext'
import UserRecord from './UserRecord'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const UsersList = () => {
  const users = useLoaderData() as UserDTO[]
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleDeleteError = (errorMessage: string) => {
    setDeleteError(errorMessage)
  }

  return (
    <>
      <div className='my-3'>
        <h1 className='display-5 text-secondary'>Users</h1>
      </div>
      {deleteError && (
        <div>
          <h4 className='text-danger'>{deleteError}</h4>
        </div>
      )}
      {users && users.length > 0 ? (
        <>
          <div style={{ display: 'flex' }}>
            <span style={{ width: '5rem' }}>User Id</span>
            <span style={{ width: '8rem' }}>Username</span>
          </div>
          <hr />
          <div>
            {users.map((user: UserDTO) => (
              <UserRecord
                key={user.userId}
                user={user}
                onDeleteError={handleDeleteError}
              />
            ))}
          </div>
        </>
      ) : (
        <div className='mt-5 d-flex justify-content-center'>
          <p>There are currently no users</p>
        </div>
      )}

      <div className='mt-5'>
        <Link to='new'>
          <Button>New User</Button>
        </Link>
      </div>
    </>
  )
}

export default UsersList
