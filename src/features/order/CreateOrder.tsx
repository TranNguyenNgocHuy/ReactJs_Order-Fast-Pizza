import { Form, ActionFunctionArgs, useNavigation, useActionData, redirect } from 'react-router-dom'
import { NewOrder } from '../../services/model'
import Button from '../../ui/Button'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchAddress, getUserName } from '../user/userSlice'
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice'
import EmptyCart from '../cart/EmptyCart'
import { createOrder } from '../../services/apiRestaurant'
import store from '../../store'
import { formatCurrency } from '../../utils/helpers'
import { useState } from 'react'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str)

interface Errors {
  phone?: string
}

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false)

  const userName = useAppSelector(getUserName)
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const formErrors = useActionData() as Errors | undefined
  const dispatch = useAppDispatch()

  const cart = useAppSelector(getCart)
  const totalCartPrice = useAppSelector(getTotalCartPrice)
  const priotityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priotityPrice

  if (!cart.length) return <EmptyCart />

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

      <button onClick={() => dispatch(fetchAddress())}>Get position</button>

      <Form method='POST'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input className='input grow' type='text' defaultValue={userName} name='customer' required />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input className='input w-full' type='tel' name='phone' required />
            {formErrors?.phone && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700'>{formErrors.phone}</p>
            )}
          </div>
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input className='input w-full' type='text' name='address' required />
          </div>
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority' className='font-semibold'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type='primary'>
            {isSubmitting ? 'Placing order...' : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  let cart
  if (typeof data.cart === 'string') {
    cart = JSON.parse(data.cart)
  }

  const order: NewOrder = {
    address: data.address as string,
    customer: data.customer as string,
    phone: data.phone as string,
    cart,
    priority: data.priority === 'on'
  }

  const errors: Errors = {}
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please give us your correct phone number. We might need it  to contact you.'
  }

  if (Object.keys(errors).length > 0) return errors

  const newOrder = await createOrder(order)

  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder
