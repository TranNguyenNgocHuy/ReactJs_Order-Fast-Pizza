import { useAppDispatch, useAppSelector } from '../../hooks'
import { PizzaObj } from '../../services/model'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utils/helpers'
import { addItem, getCurrentQuantityById } from '../cart/cartSlice'
import DeleteItem from '../cart/DeleteItem'
import UpdateItemQuantity from '../cart/UpdateItemQuantity'

function MenuItem({ pizza }: { pizza: PizzaObj }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza

  const dispatch = useAppDispatch()

  const currentQuantity = useAppSelector(getCurrentQuantityById(Number(id)))

  const isInCart = currentQuantity > 0

  function handleAddToCart() {
    const newItem = {
      pizzaId: Number(id),
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1
    }

    dispatch(addItem(newItem))
  }

  return (
    <li className='flex gap-4 py-2'>
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'opacit-70 grayscale' : ''}`} />
      <div className='flex flex-grow flex-col pt-0.5'>
        <p className='font-medium'>{name}</p>
        <p className='text-sm capitalize italic text-stone-500'>{ingredients.join(', ')}</p>
        <div className='mt-auto flex items-center justify-between'>
          {!soldOut ? (
            <p className='text-sm font-semibold'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm font-medium uppercase text-stone-500'>Sold out</p>
          )}

          {isInCart && (
            <div className='flex items-center gap-3 sm:gap-8'>
              <UpdateItemQuantity pizzaId={Number(id)} currentQuantity={currentQuantity} />
              <DeleteItem pizzaId={Number(id)} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type='small' onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  )
}

export default MenuItem
