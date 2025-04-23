// components/checkout/Address.tsx
import { useState } from 'react'
import { AddressDetails } from '../types'
import AddressForm from '../forms/AddressForm'
import { Dialog } from '@/components/ui'
import { setAddressDialog, setSelectedAddress, useAppDispatch, useAppSelector } from '../store'
import { t } from 'i18next'

const Address = () => {
    const [address, setAddress] = useState<AddressDetails>()
    const [showForm, setShowForm] = useState(false)

    const dispatch = useAppDispatch()

    const { isOpen, mode } = useAppSelector((state) => state.checkout.data.addressDialog)

    const selectedAddress = useAppSelector((state) => state.checkout.data.selectedAddress)

    const onAddAddress = () => {
        dispatch(setSelectedAddress({} as AddressDetails))
        dispatch(setAddressDialog({ isOpen: true, mode: 'ADD' }))
    }

    const onEditAddress = () => {
        if (address) {
            dispatch(setSelectedAddress(address))
            dispatch(setAddressDialog({ isOpen: true, mode: 'EDIT' }))
        }
    }

    const onDialogClose = () => {
        dispatch(setAddressDialog({ isOpen: false, mode: '' }))
    }

    return (
        <>
           <div className="border p-4 rounded-md shadow-md space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Shipping address</h2>
                    <button
                        className="text-green-700 font-medium"
                        onClick={address ? onEditAddress : onAddAddress}
                    >
                        {address ? 'Change' : 'Add'}
                    </button>
                </div>
                {address ? (
                    <div className="space-y-1 text-sm">
                        <p>{address.firstName} {address.lastName}</p>
                        <p>{address.addressLine1}</p>
                        {address.addressLine2 && <p>{address.addressLine2}</p>}
                        <p>{address.city}, {address.postCode}</p>
                        <p>{address.country}</p>
                        <p>{address.phone}</p>
                        <p className="text-xs text-gray-500">📄 Invoice address same as shipping address</p>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No shipping address provided.</p>
                )}
            </div>
                <Dialog
                    isOpen={isOpen}
                    bodyOpenClassName="overflow-hidden"
                    shouldCloseOnOverlayClick={false}
                    shouldCloseOnEsc={false}
                    onClose={onDialogClose}
                    onRequestClose={onDialogClose}
                >
                <h5 className="mb-4">
                    {mode === 'ADD'
                        ? (t('common.add') as string)
                        : (t('common.edit') as string)}
                </h5>
                <AddressForm
                    data={mode === 'EDIT' ? selectedAddress : undefined}
                    onSave={(data) => {
                        setAddress(data)
                        onDialogClose()
                    }}
                />
                </Dialog>
            </>
    )
}

export default Address

