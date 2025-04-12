import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit'
import {  apiGetOrdersHistory } from '@/services/OrderService'
import { TableQueries } from '@/@types/common';
import dayjs from 'dayjs';
import { OrderHistory } from '@/@types/auth';

export type Orders = OrderHistory[]

export type GetOrderHistoryResponse = {
    Items: OrderHistory[];
    TotalItems: number
    FilteredItems: number
    BeginIndex: number
    EndIndex: number
    ReturnedItems: number
    CurrentPage: number
    TotalPages: number
}

export type GetOrdersHistoryRequest =  TableQueries &
 {
    start?: Date
    end?: Date
    siteId?: string
    isGetLatest?: Boolean
    itemsCount?: number;
    limit?: number;
    offset: number;
}

export type OrdersHistoryState = {
    startDate: number
    endDate: number
    loading: boolean;
    orderHistory: OrderHistory[];
    tableData: TableQueries;
}

export const SLICE_NAME = 'ordersHistory'

export const getOrdersHistory = createAsyncThunk(
    SLICE_NAME + '/getOrdersHistory',
    async (data: GetOrdersHistoryRequest) => {
        const response = await apiGetOrdersHistory<
        GetOrderHistoryResponse,
        GetOrdersHistoryRequest
        >(data)
        return response.data
    }
)

export const initialOrderHistoryData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 25,
    query: '',
    sort: {
        order: 'asc',
        key: 'CreatedDate',
    },
}

const initialState: OrdersHistoryState = {
    startDate: dayjs(
        dayjs().subtract(3, 'month').format('DD-MMM-YYYY, hh:mm A')
    ).unix(),
    endDate: dayjs(new Date()).unix(),
    loading: false,
    orderHistory: [],
    tableData: initialOrderHistoryData
}

const ordersHistorySlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setOrderHistory: (state, action) => {
            state.orderHistory = action.payload
        },
        // setOrderHistoryData: (state, action) =>(
        //     state.tableData = action.payload
        // ),
        setOrderHistoryData: (state, action) => {
            const { pageIndex, pageSize, total, query, sort } = action.payload;
            state.tableData.pageIndex = pageIndex ?? state.tableData.pageIndex;
            state.tableData.pageSize = pageSize ?? state.tableData.pageSize;
            state.tableData.total = total ?? state.tableData.total;
            state.tableData.query = query ?? state.tableData.query;
            state.tableData.sort = sort ?? state.tableData.sort;
        },
        setStartDate: (state, action: PayloadAction<number>) => {
            state.startDate = action.payload
        },
        setEndDate: (state, action: PayloadAction<number>) => {
            state.endDate = action.payload
        },
        setPageIndex: (state, action: PayloadAction<number>) => {
            state.tableData.pageIndex = action.payload
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.tableData.pageSize = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrdersHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrdersHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.orderHistory = action.payload.Items;
                state.tableData.total = action.payload.FilteredItems;
            })
    },
})

export const {
    setOrderHistory,
    setStartDate,
    setEndDate,
    setPageIndex,
    setPageSize,
    setOrderHistoryData,
} = ordersHistorySlice.actions

export default ordersHistorySlice.reducer
