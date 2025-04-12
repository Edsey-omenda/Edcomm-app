import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { GetProductDetailsRequest, Product } from '../../types'
import { apiGetProductDetail } from '@/services/ProductService'


export const SLICE_NAME = 'productDetails'

export const getProductDetails = createAsyncThunk(
    SLICE_NAME + '/getProductDetails',
    async (data: GetProductDetailsRequest) => {
        const response = await apiGetProductDetail<Product, GetProductDetailsRequest>(data)
        return response.data
    }
)

export type ProductDetailsState = {
    loading: boolean
    productDetail: Product | null
}

const initialState: ProductDetailsState = {
    loading: false,
    productDetail: null,
}

const productDetailsSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.productDetail = action.payload
                state.loading = false
            })
            .addCase(getProductDetails.pending, (state) => {
                state.loading = true
            })
            .addCase(getProductDetails.rejected, (state) => {
                state.loading = false
            })
    },
})

export const { } = productDetailsSlice.actions

export default productDetailsSlice.reducer
