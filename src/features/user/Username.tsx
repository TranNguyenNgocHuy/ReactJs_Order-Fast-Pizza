import { useAppSelector } from '../../hooks'
import { getUserName } from './userSlice'

function Username() {
  const userName = useAppSelector(getUserName)
  if (!userName) return null

  return <div className='hidden text-sm font-semibold md:block'>{userName}</div>
}

export default Username
