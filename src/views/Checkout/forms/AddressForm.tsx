import Input from '@/components/ui/Input'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { Field, FieldInputProps, FieldProps, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { AddressDetails, CountryOption } from '../types'
import { setAddressDialog, setShippingAddress, useAppDispatch } from '../store'
import { InputGroup } from '@/components/ui/InputGroup'
import { countryList } from '@/constants/countries.constant'
import type { InputProps } from '@/components/ui/Input'
import type { ComponentType } from 'react'
import Select from '@/components/ui/Select'
import type { OptionProps, SingleValueProps } from 'react-select'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { components } from 'react-select'

const { SingleValue } = components

type AddressFormProps = {
    onSave: (formData: AddressDetails) => void
    data?: AddressDetails | null
}

const PhoneSelectOption = ({
    innerProps,
    data,
    isSelected,
}: OptionProps<CountryOption>) => {
    return (
        <div
            className={`cursor-pointer flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center gap-2">
                <span>
                    ({data.value}) {data.dialCode}
                </span>
            </div>
        </div>
    )
}

const PhoneControl = (props: SingleValueProps<CountryOption>) => {
    const selected = props.getValue()[0]
    return (
        <SingleValue {...props}>
            {selected && <span>{selected.dialCode}</span>}
        </SingleValue>
    )
}

const NumberInput = (props: InputProps) => {
    return <Input {...props} value={props.field.value} />
}

const NumericFormatInput = ({
    onValueChange,
    ...rest
}: Omit<NumericFormatProps, 'form'> & {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    form: any
    field: FieldInputProps<unknown>
}) => {
    return (
        <NumericFormat
            customInput={Input as ComponentType}
            type="text"
            autoComplete="off"
            onValueChange={onValueChange}
            {...rest}
        />
    )
}

const AddressForm = ({ onSave, data }: AddressFormProps) => {

        const { t } = useTranslation()
        const navigate = useNavigate()
        const dispatch = useAppDispatch()

        const validationSchema = Yup.object().shape({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            addressLine1: Yup.string().required('Address Line 1 is required'),
            city: Yup.string().required('City is required'),
            postCode: Yup.string().required('Post Code is required'),
            country: Yup.string().required('Country is required'),
            phone: Yup.string().required('Phone is required'),
        })        

        console.log("Data for AddressForm:", data);
        const onDialogClose = () => {
                dispatch(setAddressDialog({ isOpen: false, mode: '' }))
        }
        
        const onFormSubmit = async (values: AddressDetails) => {
            dispatch(setShippingAddress(values)) // ✅ Save in state
            onSave(values) // ✅ Also update local state in Address.tsx
            toast.push(
                <Notification
                    title="Address Saved"
                    type="success"
                    duration={2500}
                >
                    Shipping address saved successfully.
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            dispatch(setAddressDialog({ isOpen: false, mode: '' }))
        }           

        return (
            <Formik
                enableReinitialize
                initialValues={{
                    firstName: data ? data.firstName : '',
                    lastName: data ? data.lastName : '',
                    addressLine1: data ? data.addressLine1 : '',
                    addressLine2: data ? data.addressLine2 : '',
                    city: data ? data.city : '',
                    postCode: data ? data.postCode : '',
                    country: data ? data.country : '',
                    countryCode: data ? data.countryCode : '+254',
                    phone: data ? data.phone : '',
                    isSameAsShippingAddress: data ? data.isSameAsShippingAddress : false,
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        await onFormSubmit(values)
                    } finally {
                        setSubmitting(false)
                    }
                }}
                
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                        <FormItem
                            label="Country"
                            invalid={(errors.country && touched.country) as boolean}
                            errorMessage={errors.country}
                        >
                            <Field name="country">
                                {({ field, form }: FieldProps) => (
                                    <Select
                                        placeholder="Country"
                                        field={field}
                                        form={form}
                                        options={countryList}
                                        value={countryList.filter(
                                            (c) => c.value === values.country
                                        )}
                                        onChange={(c) =>
                                            form.setFieldValue(field.name, c?.value)
                                        }
                                    />
                                )}
                            </Field>
                        </FormItem>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormItem
                            label="First Name"
                            invalid={(errors.firstName && touched.firstName) as boolean}
                            errorMessage={errors.firstName}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="firstName"
                                placeholder="First Name"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Last Name"
                            invalid={(errors.lastName && touched.lastName) as boolean}
                            errorMessage={errors.lastName}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="lastName"
                                placeholder="Last Name"
                                component={Input}
                            />
                        </FormItem>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormItem
                            label="Address Line 1"
                            invalid={(errors.addressLine1 && touched.addressLine1) as boolean}
                            errorMessage={errors.addressLine1}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="addressLine1"
                                placeholder="Enter Address Line 1"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Address Line 2"
                            invalid={(errors.addressLine2 && touched.addressLine2) as boolean}
                            errorMessage={errors.addressLine2}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="addressLine2"
                                placeholder="Enter Address Line 2"
                                component={Input}
                            />
                        </FormItem>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormItem
                                label="Post Code"
                                invalid={(errors.postCode && touched.postCode) as boolean}
                                errorMessage={errors.postCode}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="postCode"
                                    placeholder="Enter Post Code"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="City"
                                invalid={(errors.city && touched.city) as boolean}
                                errorMessage={errors.city}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="city"
                                    placeholder="Enter City"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                            <FormItem
                                    label="Phone"
                                    invalid={
                                        (errors.countryCode &&
                                            touched.countryCode) ||
                                        (errors.phone && touched.phone)
                                    }
                                    errorMessage="Please enter your phone number"
                                >
                                    <InputGroup>
                                        <Field name="countryCode">
                                            {({ field, form }: FieldProps) => (
                                                <Select<CountryOption>
                                                    className="min-w-[130px]"
                                                    placeholder="Dial Code"
                                                    components={{
                                                        Option: PhoneSelectOption,
                                                        SingleValue:
                                                            PhoneControl,
                                                    }}
                                                    field={field}
                                                    form={form}
                                                    options={countryList}
                                                    value={countryList.filter(
                                                        (country) =>
                                                            country.dialCode ===
                                                            values.countryCode
                                                    )}
                                                    onChange={(country) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            country?.dialCode
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                        <Field name="phone">
                                            {({ field, form }: FieldProps) => {
                                                return (
                                                    <NumericFormatInput
                                                        form={form}
                                                        field={field}
                                                        customInput={
                                                            NumberInput as ComponentType
                                                        }
                                                        placeholder="Phone Number"
                                                        onValueChange={(e) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                e.value
                                                            )
                                                        }}
                                                    />
                                                )
                                            }}
                                        </Field>
                                    </InputGroup>
                                </FormItem>
                            <div className="text-right mt-2">
                                <Button
                                    size="sm"
                                    className="ltr:mr-2 rtl:ml-2"
                                    variant="plain"
                                    onClick={onDialogClose}
                                    type='button'
                                >
                                    {t('common.cancel') as string}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="solid"
                                    type="submit"
                                >
                                    {t('common.save') as string}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        )
    }

AddressForm.displayName = 'AddressForm'

export default AddressForm
