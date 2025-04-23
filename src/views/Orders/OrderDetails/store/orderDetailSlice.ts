import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { 
    GetOrderByIdRequest, 
    Order,
} from '../../types';
import {
    apiGetOrderDetail, 
} from '@/services/OrderService';

export const SLICE_NAME = 'orderDetail'

export const getOrderDetail = createAsyncThunk(
    SLICE_NAME + '/getOrderDetail',
    async (data: GetOrderByIdRequest) => {
        const response = await apiGetOrderDetail<
        Order,
        GetOrderByIdRequest
        >(data)
        return response.data
    }
)

export type OrderDetailState = {
    loading: boolean;
    orderDetail: Order | null;
}

const initialState: OrderDetailState = {
    loading: false,
    orderDetail: null,
}

const orderDetailSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        resetOrderDetail: (state) => {
            state.orderDetail = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrderDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetail = action.payload;
            })
            .addCase(getOrderDetail.rejected, (state) => {
                state.loading = false;
            })
    },
})

export const {
    resetOrderDetail,
} = orderDetailSlice.actions

export default orderDetailSlice.reducer
