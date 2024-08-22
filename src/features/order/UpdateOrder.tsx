import { ActionFunctionArgs, useFetcher } from 'react-router-dom'
import Button from '../../ui/Button'
import Order from './Order'
import { updateOrder } from '../../services/apiRestaurant'

interface Props {
  order: Order
}

function UpdateOrder({ order }: Props) {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method='PATCH' className='text-right'>
      <Button type='primary'>Make priority</Button>
    </fetcher.Form>
  )
}

export default UpdateOrder

export async function action({ params }: ActionFunctionArgs) {
  if (!params.orderId) {
    throw new Error('Order ID is missing')
  }

  const data = { priority: true }
  await updateOrder(params.orderId, data)

  return null
}
