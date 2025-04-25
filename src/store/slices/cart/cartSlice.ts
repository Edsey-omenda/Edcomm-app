import { RootState } from '@/store/rootReducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
    productId: string
    productName: string
    price: number
    quantity: number
    imageUrl?: string
}

export type CartState = {
    items: CartItem[]
    totalQuantity: number
    totalPrice: number
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const item = action.payload
            const existing = state.items.find(i => i.productId === item.productId)

            if (existing) {
                existing.quantity += item.quantity
            } else {
                state.items.push({ ...item })
            }

            state.totalQuantity += item.quantity
            state.totalPrice += item.quantity * item.price
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const productId = action.payload
            const item = state.items.find(i => i.productId === productId)
            if (item) {
                item.quantity += 1
                state.totalQuantity += 1
                state.totalPrice += item.price
            }
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const productId = action.payload
            const item = state.items.find(i => i.productId === productId)
            if (item && item.quantity > 1) {
                item.quantity -= 1
                state.totalQuantity -= 1
                state.totalPrice -= item.price
            } else if (item && item.quantity === 1) {
                state.items = state.items.filter(i => i.productId !== productId)
                state.totalQuantity -= 1
                state.totalPrice -= item.price
            }
        },        
        removeFromCart: (state, action: PayloadAction<string>) => {
            const productId = action.payload
            const item = state.items.find(i => i.productId === productId)
            if (item) {
                state.totalQuantity -= item.quantity
                state.totalPrice -= item.quantity * item.price
                state.items = state.items.filter(i => i.productId !== productId)
            }
        },
        updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
            const { productId, quantity } = action.payload
            const item = state.items.find(i => i.productId === productId)
            if (item) {
                const quantityDiff = quantity - item.quantity
                item.quantity = quantity
                state.totalQuantity += quantityDiff
                state.totalPrice += quantityDiff * item.price
            }
        },
        clearCart: (state) => {
            state.items = []
            state.totalQuantity = 0
            state.totalPrice = 0
        },
        updateCartState: (state, action: PayloadAction<CartState>) => {
            state.items = action.payload.items
            state.totalQuantity = action.payload.totalQuantity
            state.totalPrice = action.payload.totalPrice
        }
    },
})

export const selectTotalItems = (state: RootState) => state.cart.items.length;

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, updateQuantity, clearCart, updateCartState } = cartSlice.actions
export default cartSlice.reducer
