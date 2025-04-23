export type AddressDetails = {
    firstName: string
    lastName: string
    addressLine1: string
    addressLine2?: string
    city: string
    postCode: string
    country: string
    countryCode: string
    phone: string
    isSameAsShippingAddress?: boolean
}

export type Dialog = {
    isOpen: boolean
    mode: 'ADD' | 'EDIT' | ''
}

export type CountryOption = {
    label: string
    dialCode: string
    value: string
}

