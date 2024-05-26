import Button from 'react-bootstrap/Button'
import { UserDTO } from '../types/AuthContext'
import { deleteUser } from '../utils/UserFunctions'
import { useNavigate } from 'react-router-dom'

const UserRecord = ({
  user,
  onDeleteError,
}: {
  user: UserDTO
  onDeleteError: (error: string) => void
}) => {
  const navigate = useNavigate()

  const handleDeleteUser = async () => {
    const proceed = window.confirm(
      `Are you sure you would like to delete ${user.username}?`
    )
    if (proceed) {
      try {
        await deleteUser({ userId: user.userId })
        navigate('/users')
      } catch (error) {
        onDeleteError(
          typeof error === 'object' && error !== null && 'message' in error
            ? (error as { message: string }).message
            : 'An error occured while deleting the user'
        )
      }
    }
  }

  return (
    <div className='my-2' key={user.userId} style={{ display: 'flex' }}>
      <span style={{ width: '5rem' }}>{user.userId}</span>
      <span style={{ width: '8rem' }}>{user.username}</span>{' '}
      <span style={{ width: '10rem' }}>
        <Button onClick={handleDeleteUser}>Delete</Button>
      </span>
    </div>
  )
}

export default UserRecord
