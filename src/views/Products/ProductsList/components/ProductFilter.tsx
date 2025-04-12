import { useState, useRef, forwardRef } from 'react'
import { HiOutlineFilter } from 'react-icons/hi'
import {
    getProducts,
    setProductsData,
    useAppDispatch,
    useAppSelector,
} from '../store'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import Drawer from '@/components/ui/Drawer'
import { Field, Form, Formik, FormikProps, FieldProps } from 'formik'
import type { MouseEvent } from 'react'
import { productCategories } from '../../constants'

type FormModel = {
    category: string[]
}

type FilterFormProps = {
    onSubmitComplete?: () => void
}

type DrawerFooterProps = {
    onSaveClick: (event: MouseEvent<HTMLButtonElement>) => void
    onCancel: (event: MouseEvent<HTMLButtonElement>) => void
}

const FilterForm = forwardRef<FormikProps<FormModel>, FilterFormProps>(
    ({ onSubmitComplete }, ref) => {
        const dispatch = useAppDispatch()

        const filterData = useAppSelector(
            (state) => state.productList.productsData 
        )

        const handleSubmit = (values: FormModel) => {
            onSubmitComplete?.()

            const categoryQuery = values.category.join(',')
            //console.log("Categories to be filtered: ", categoryQuery);

            const pageIndex = 1 
            const pageSize = filterData.pageSize ?? 10

            dispatch(setProductsData({ ...filterData, category: values.category }))
            dispatch(getProducts({
                pageIndex,
                pageSize,
                filterQuery: categoryQuery,
                filterOn: 'Category',
                isAscending: true,
            }))
        }

        return (
            <Formik
                enableReinitialize
                innerRef={ref}
                initialValues={{category: filterData.category || []}}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
            >
                {({ values, touched, errors }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                            >
                                <h6 className="mb-4">Product Category</h6>
                                <Field name="category">
                                    {({ field, form }: FieldProps) => (
                                        <>
                                            <Checkbox.Group
                                                vertical
                                                value={values.category}
                                                // onChange={(options) =>
                                                //     form.setFieldValue(field.name, options)
                                                // }
                                                onChange={(options) => {
                                                    //console.log("Selected Categories:", options)
                                                    form.setFieldValue(field.name, options)
                                                }}
                                            >
                                                {productCategories.map((cat) => (
                                                    <Checkbox
                                                        className="mb-3"
                                                        key={cat.value}
                                                        name={field.name}
                                                        value={cat.value}
                                                    >
                                                        {cat.label}
                                                    </Checkbox>
                                                ))}
                                            </Checkbox.Group>
                                        </>
                                    )}
                                </Field>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        )
    }
)

const DrawerFooter = ({ onSaveClick, onCancel }: DrawerFooterProps) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                Cancel
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                Query
            </Button>
        </div>
    )
}

const ProductFilter = () => {
    const formikRef = useRef<FormikProps<FormModel>>(null)

    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = () => {
        setIsOpen(false)
    }

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    return (
        <>
            <Button
                size="sm"
                className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4"
                icon={<HiOutlineFilter />}
                onClick={() => openDrawer()}
            >
                Filter
            </Button>
            <Drawer
                title="Filter"
                isOpen={isOpen}
                footer={
                    <DrawerFooter
                        onCancel={onDrawerClose}
                        onSaveClick={formSubmit}
                    />
                }
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                <FilterForm ref={formikRef} onSubmitComplete={onDrawerClose} />
            </Drawer>
        </>
    )
}

FilterForm.displayName = 'FilterForm'

export default ProductFilter
