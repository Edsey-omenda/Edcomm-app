import Input from '@/components/ui/Input'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { FieldProps } from 'formik'
import { useTranslation } from 'react-i18next'
import { HiCalendar, HiCheckCircle } from 'react-icons/hi'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import dayjs from 'dayjs'
import { productCategories, sizes } from '../../constants'
import { AddEditProduct, Category, Size } from '../../types'
import RichTextEditor from '@/components/shared/RichTextEditor'
import CreatableSelect from 'react-select/creatable'
import ColourPalette from '@/components/shared/ColourPalette'
import { apiAddProduct } from '@/services/ProductService'
import { useNavigate } from 'react-router-dom'


const NewProductForm = () => {

        const { t } = useTranslation()
        const navigate = useNavigate()

        const sizesOptions: Size[] = sizes.map(size => ({
            label: size.label,
            value: size.value,
        }))

        const today = dayjs().format('YYYY-MM-DD')

        const validationSchema = Yup.object().shape({
            name: Yup.string().required(
                t('forms.nameRequired') as string
            ),
        })
        
        const onFormSubmit = async (
            values: AddEditProduct
        ) => {
        
            const payload = {
                ...values,
                size: values.size,
                color: values.color
            }
            console.log("Data to send: ", payload)
        
            const response = await apiAddProduct(payload)        

            if (response.status == 200) {       
                toast.push(
                    <Notification
                        title={'Product Created'}
                        type="success"
                        customIcon={
                            <HiCheckCircle className="text-2xl text-emerald-500" />
                        }
                    >
                        Successfully created a Product.
                    </Notification>
                )
                setTimeout(() => {
                    navigate('/products/products-list')
                }, 500)
            } else {
                toast.push(
                    <Notification title={'Failed'} type="danger">
                        Failed to create a Product! Please try again.
                    </Notification>
                )
            }
        }   

        return (
            <Formik
                enableReinitialize
                initialValues={{
                    name: '',
                    description: '',
                    price: 1,
                    stock: 0,
                    imageUrl: '',
                    category: '',
                    color: [],
                    size: [],
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
                            label="Product Name"
                            invalid={(errors.name && touched.name) as boolean}
                            errorMessage={errors.name}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="name"
                                placeholder="Name"
                                component={Input}
                            />
                        </FormItem>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormItem
                            label="Image URL"
                            // invalid={(errors.imageUrl && touched.imageUrl) as boolean}
                            // errorMessage={errors.imageUrl}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="imageUrl"
                                placeholder="Enter Image URL"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Price"
                            // invalid={(errors.price && touched.price) as boolean}
                            // errorMessage={errors.price}
                        >
                            <Field
                                type="number"
                                autoComplete="off"
                                name="price"
                                placeholder="Enter Price"
                                component={Input}
                            />
                        </FormItem>
                        </div>
                        <FormItem
                            label="Description"
                            labelClass="!justify-start"
                            // invalid={(errors.description && touched.description) as boolean}
                            // errorMessage={errors.description}
                        >
                            <Field name="description">
                                {({ field, form }: FieldProps) => (
                                    <RichTextEditor
                                        value={field.value}
                                        onChange={(val) =>
                                            form.setFieldValue(field.name, val)
                                        }
                                    />
                                )}
                            </Field>
                        </FormItem>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormItem
                                label="Category"
                                // invalid={(errors.category && touched.category) as boolean}
                                // errorMessage={errors.category}
                            >
                                <Field name="category">
                                    {({ field, form }: FieldProps) => (
                                        <Select<Category>
                                            componentAs={CreatableSelect}
                                            isClearable
                                            field={field}
                                            form={form}
                                            options={productCategories}
                                            value={
                                                productCategories.find((cat) => cat.value === values.category) || null
                                            }
                                            onChange={(option) =>
                                                form.setFieldValue(field.name, option?.value || '')
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                label="Stock"
                                // invalid={(errors.stock && touched.stock) as boolean}
                                // errorMessage={errors.stock}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="stock"
                                    placeholder="Enter Stock"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <FormItem
                                    label="Color"
                                    // invalid={
                                    //     (errors.color && touched.color) as boolean
                                    // }
                                    // errorMessage={errors.color}
                                >
                                    <Field name="color">
                                        {({ field, form }: FieldProps) => (
                                            <ColourPalette
                                                isMultiSelect={true}
                                                value={values.color || []}
                                                field={field}
                                                form={form}
                                                onChange={(value) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        value
                                                    )
                                                }
                                            ></ColourPalette>
                                        )}
                                    </Field>
                                </FormItem>
                            </div>
                            <div className="col-span-1">
                                <FormItem
                                    label="Size"
                                    // invalid={
                                    //     (errors.size && touched.size) as unknown as boolean
                                    // }
                                    // errorMessage={errors.size as string}
                                >
                                    <Field name="size">
                                        {({ field, form }: FieldProps) => (
                                            <Select<Size, true>
                                            isMulti
                                            componentAs={CreatableSelect}
                                            field={field}
                                            form={form}
                                            options={sizesOptions}
                                            value={sizesOptions.filter(opt => (values.size as string[]).includes(opt.value))}
                                            onChange={(option) =>
                                                form.setFieldValue(field.name, option.map((s) => s.value))
                                            }
                                        />                                        
                                        )}
                                    </Field>
                                </FormItem>
                            </div>
                        </div>
                            <div className="text-right mt-2">
                                <Button
                                    size="sm"
                                    className="ltr:mr-2 rtl:ml-2"
                                    variant="plain"
                                    //onClick={onDialogClose}
                                    type='button'
                                >
                                    {t('common.cancel') as string}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="solid"
                                    type="submit"
                                >
                                    {t('common.add') as string}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        )
    }

NewProductForm.displayName = 'NewProductForm'

export default NewProductForm
