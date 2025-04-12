import AdaptableCard from '@/components/shared/AdaptableCard'
import { injectReducer, useAppDispatch } from '@/store'
import { useParams } from 'react-router-dom'
import reducer, { getProductDetails, useAppSelector } from './store'
import { GetProductDetailsRequest } from '../types'
import { useEffect } from 'react'
import EditProductForm from './components/forms/EditProductForm'

injectReducer('productEdit', reducer)

const EditProduct = () => {

    const { id } = useParams()
    const dispatch = useAppDispatch()

    const { productDetail, loading } = useAppSelector((state) => state.productEdit.data)

    useEffect(() => {
        if (id) {
            fetchData({ id: id })
        }
    }, [id])

    const fetchData = (id: GetProductDetailsRequest) => {
        dispatch(getProductDetails(id))
    }

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
            { productDetail && productDetail && (
                <EditProductForm data={productDetail} />
            )}
            </div>
        </AdaptableCard>
    )
}

export default EditProduct
