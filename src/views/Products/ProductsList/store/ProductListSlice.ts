import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { TableQueries } from '@/@types/common'
import { GenericRequest, GetProductDetailsRequest, GetProductsRequest, GetProductsResponse, Product } from '../../types'
import { apiDeleteProduct, apiGetProductDetail, apiGetProducts } from '@/services/ProductService'


export const SLICE_NAME = 'productList'

export const getProducts = createAsyncThunk(
    SLICE_NAME + '/getProducts',
    async (data: GetProductsRequest) => {
        const response = await apiGetProducts<
            GetProductsResponse,
            GetProductsRequest
        >(data)
        return response.data
    }
)

export const getProductDetails = createAsyncThunk(
    SLICE_NAME + '/getProductDetails',
    async (data: GetProductDetailsRequest) => {
        const response = await apiGetProductDetail<Product, GetProductDetailsRequest>(data)
        return response.data
    }
)

export const removeProduct = async (data: GenericRequest) => {
        const response = await apiDeleteProduct<GenericRequest>(data)
        return response.status === 200
    }

export type ProductListState = {
    loading: boolean
    productsData: TableQueries
    productsList: Product[]
    productDetailDialog: boolean
    productDetail: Product | null
    selectedProduct: Product | null
}

export const initialProductsData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 25,
    query: '',
    sort: {
        order: 'asc',
        key: 'Name',
    },
    category: ''
}

export type Sort = {
    key: string;
    order: string;
};

const initialState: ProductListState = {
    loading: false,
    productsData: initialProductsData,
    productsList: [],
    productDetailDialog: false,
    productDetail: null,
    selectedProduct: null,
}

const productsListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductsList: (state, action) => {
            state.productsList = action.payload
        },
        setProductsData: (state, action) => {
            state.productsData = action.payload
        },
        toggleProductDetailsDialog: (state, action) => {
            state.productDetailDialog = action.payload
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
        deleteProduct: (state, action) => {
            let products = state.productsList.filter(
                (prod) => prod.productId !== action.payload
            )
            state.productsList = products
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.productsList = action.payload.items
                state.productsData.total = action.payload.filteredItems
                state.loading = false
            })
            .addCase(getProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(getProducts.rejected, (state) => {
                state.loading = false
            })
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

export const {
    updateProductsList,
    setProductsData,
    toggleProductDetailsDialog,
    setSelectedProduct,
    deleteProduct,
} = productsListSlice.actions

export default productsListSlice.reducer
