import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { 
    GetProductDetailsRequest, 
    Product 
} from '../../types'
import { apiGetProductDetail } from '@/services/ProductService'


export const SLICE_NAME = 'productEdit'

export const getProductDetails = createAsyncThunk(
    SLICE_NAME + '/getProductDetails',
    async (data: GetProductDetailsRequest) => {
        const response = await apiGetProductDetail<Product, GetProductDetailsRequest>(data)
        return response.data
    }
)

export type ProductEditState = {
    loading: boolean
    productDetail: Product | null
}

const initialState: ProductEditState = {
    loading: false,
    productDetail: null,
}

const productEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setProductDetail: (state, action) => {
            state.productDetail = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.productDetail = action.payload
                console.log("object", action.payload)
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

export const {
    setProductDetail,
} = productEditSlice.actions

export default productEditSlice.reducer
