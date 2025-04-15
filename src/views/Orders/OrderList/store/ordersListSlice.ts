import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit'
import { TableQueries } from '@/@types/common';
import { 
    GetOrdersListRequest, 
    GetOrdersListResponse, 
    OrdersList 
} from '../../types';
import { 
    apiGetAdminOrders, 
    apiGetMyOrders 
} from '@/services/OrderService';

export const SLICE_NAME = 'ordersList'

export const getAdminOrders = createAsyncThunk(
    SLICE_NAME + '/getAdminOrders',
    async (data: GetOrdersListRequest) => {
        const response = await apiGetAdminOrders<
        GetOrdersListResponse,
        GetOrdersListRequest
        >(data)
        return response.data
    }
)

export const getMyOrders = createAsyncThunk(
    SLICE_NAME + '/getMyOrders',
    async (data: GetOrdersListRequest) => {
        const response = await apiGetMyOrders<
        GetOrdersListResponse,
        GetOrdersListRequest
        >(data)
        return response.data
    }
)

export const initialAdminOrdersData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 25,
    query: '',
    sort: {
        order: 'asc',
        key: '',
    },
    category: ''
}

export const initialMyOrdersData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 25,
    query: '',
    sort: {
        order: 'asc',
        key: '',
    },
    category: ''
}

export type OrdersListState = {
    loading: boolean;
    adminOrders: OrdersList;
    myOrders: OrdersList;
    adminTableData: TableQueries;
    myTableData: TableQueries;
}

const initialState: OrdersListState = {
    loading: false,
    adminOrders: [],
    myOrders: [],
    adminTableData: initialAdminOrdersData,
    myTableData: initialMyOrdersData
}

const ordersListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setAdminOrders: (state, action: PayloadAction<OrdersList>) => {
            state.adminOrders = action.payload
        },
        setMyOrders: (state, action: PayloadAction<OrdersList>) => {
            state.myOrders = action.payload
        },
        setAdminTableData: (state, action: PayloadAction<TableQueries>) => {
            state.adminTableData = action.payload
        },
        setMyTableData: (state, action: PayloadAction<TableQueries>) => {
            state.myTableData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdminOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAdminOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.adminOrders = action.payload.items;
                state.adminTableData.total = action.payload.filteredItems;
            })
            .addCase(getAdminOrders.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getMyOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.myOrders = action.payload.items;
                state.myTableData.total = action.payload.filteredItems;
            })
            .addCase(getMyOrders.rejected, (state) => {
                state.loading = false;
            })
    },
})

export const {
    setAdminOrders,
    setMyOrders,
    setAdminTableData,
    setMyTableData
} = ordersListSlice.actions

export default ordersListSlice.reducer
