import { useAppDispatch } from '../../hooks'
import Button from '../../ui/Button'
import { deleteItem } from './cartSlice'

interface Props {
  pizzaId: number
}

function DeleteItem({ pizzaId }: Props) {
  const dispatch = useAppDispatch()

  function handleDeleteItem() {
    dispatch(deleteItem(pizzaId))
  }

  return (
    <div>
      <Button type='small' onClick={handleDeleteItem}>
        Delete
      </Button>
    </div>
  )
}

export default DeleteItem
