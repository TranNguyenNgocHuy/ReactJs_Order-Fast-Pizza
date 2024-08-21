import { useAppDispatch } from '../../hooks'
import Button from '../../ui/Button'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice'

interface Props {
  pizzaId: number
  currentQuantity: number
}

function UpdateItemQuantity({ pizzaId, currentQuantity }: Props) {
  const dispatch = useAppDispatch()

  return (
    <div className='flex items-center gap-2 md:gap-3'>
      <Button type='round' onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>
        -
      </Button>
      <span className='test-sm font-medium'>{currentQuantity}</span>
      <Button type='round' onClick={() => dispatch(increaseItemQuantity(pizzaId))}>
        +
      </Button>
    </div>
  )
}

export default UpdateItemQuantity
