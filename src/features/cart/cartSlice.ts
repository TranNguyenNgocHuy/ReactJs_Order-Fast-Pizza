import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Item } from '../../services/model'
import { RootState } from '../../store'

export interface CartState {
  cart: Item[]
}

const initialState: CartState = {
  cart: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      state.cart.push(action.payload)
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => action.payload !== item.pizzaId)
    },
    increaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => action.payload === item.pizzaId)

      if (!item) return
      item.quantity++
      item.totalPrice = item.quantity * item.unitPrice
    },
    decreaseItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => action.payload === item.pizzaId)

      if (!item) return

      item.quantity--
      item.totalPrice = item.quantity * item.unitPrice
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action)
    },
    clearCart(state) {
      state.cart = []
    }
  }
})

export const getCart = (state: RootState) => state.cart.cart

export const getCurrentQuantityById = (id: number) => (state: RootState) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0

export const getTotalCartQuantity = (state: RootState) =>
  state.cart.cart.reduce((sum, currentItem) => sum + currentItem.quantity, 0)

export const getTotalCartPrice = (state: RootState) =>
  state.cart.cart.reduce((sum, currentItem) => sum + currentItem.totalPrice, 0)

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer
