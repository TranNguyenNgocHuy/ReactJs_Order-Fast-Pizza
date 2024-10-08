import { useNavigate, Link } from 'react-router-dom'

interface Props {
  to: string
  children: React.ReactNode
}

function LinkButton({ children, to }: Props) {
  const navigate = useNavigate()
  const className = 'text-sm text-blue-500 hover:text-blue-600 hover:underline'

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    )

  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  )
}

export default LinkButton
