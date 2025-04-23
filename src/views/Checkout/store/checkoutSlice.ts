import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AddressDetails, Dialog } from '../types'

export const SLICE_NAME = 'checkout'

export type CheckoutState = {
    shippingAddress: AddressDetails | null
    billingAddress: AddressDetails | null
    addressDialog: Dialog
    selectedAddress: AddressDetails | null
}

const initialDialogState: Dialog = {
    isOpen: false,
    mode: '',
}

const initialState: CheckoutState = {
    shippingAddress: null,
    billingAddress: null,
    addressDialog: initialDialogState,
    selectedAddress: null,
}

const checkoutSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setAddressDialog(state, action) {
            state.addressDialog = action.payload
        },
        setSelectedAddress(state, action: PayloadAction<AddressDetails>) {
            state.selectedAddress = action.payload
        },
        setShippingAddress(state, action: PayloadAction<AddressDetails>) {
            state.shippingAddress = action.payload
            if (action.payload.isSameAsShippingAddress) {
                state.billingAddress = action.payload
            }
        },
        setBillingAddress(state, action: PayloadAction<AddressDetails>) {
            state.billingAddress = action.payload
        },
        clearAddresses(state) {
            state.shippingAddress = null
            state.billingAddress = null
        },
    },
})

export const {
    setAddressDialog,
    setSelectedAddress,
    setShippingAddress,
    setBillingAddress,
    clearAddresses,
} = checkoutSlice.actions

export default checkoutSlice.reducer
