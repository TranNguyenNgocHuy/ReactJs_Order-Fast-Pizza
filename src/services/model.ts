export interface PizzaObj {
  id: string
  imageUrl: string
  ingredients: string[]
  name: string
  soldOut: boolean
  unitPrice: number
}

export interface NewOrder {
  address: string
  cart: Cart[]
  customer: string
  phone: string
  priority: boolean
}

interface Cart {
  pizzaId: number
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
}
