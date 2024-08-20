import { useLoaderData } from 'react-router-dom'
import { getMenu } from '../../services/apiRestaurant'
import { PizzaObj } from '../../services/model'
import MenuItem from './MenuItem'

function Menu() {
  const menu = useLoaderData() as PizzaObj[]

  return (
    <div>
      <ul className='divide-y divide-stone-200 px-2'>
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </div>
  )
}

export async function loader() {
  const menu = await getMenu()
  return menu
}

export default Menu
