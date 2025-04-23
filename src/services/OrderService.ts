import appConfig from "@/configs/app.config";
import { 
    GetOrderByIdRequest, 
    GetOrdersListRequest, 
    OrderItemDTO
} from "@/views/Orders/types";
import ApiService from "./ApiService";

const BASE_URL = appConfig.apiPrefix;

export async function apiGetAdminOrders<T, U>(
    data: GetOrdersListRequest
) {

    console.log("Calling API with request:", data);
    console.log('Data Query: ' + JSON.stringify(data))

    const params = {
        filterOn: data.filterOn ?? 'CustomerName',
        filterQuery: data.filterQuery ?? '',
        sortBy: data.sortBy ?? '',
        isAscending: data.isAscending ?? true,
        pageIndex: data.pageIndex ?? 1,
        pageSize: data.pageSize ?? 10,
    }

    return ApiService.fetchData<T>({
        url: `${BASE_URL}/Order/all-orders`,
        method: 'get',
        params,
    })
}

export async function apiGetMyOrders<T, U>(
    data: GetOrdersListRequest
) {

    console.log("Calling API with request:", data);
    console.log('Data Query: ' + JSON.stringify(data))

    const params = {
        filterOn: data.filterOn ?? 'CustomerName',
        filterQuery: data.filterQuery ?? '',
        sortBy: data.sortBy ?? '',
        isAscending: data.isAscending ?? true,
        pageIndex: data.pageIndex ?? 1,
        pageSize: data.pageSize ?? 10,
    }

    return ApiService.fetchData<T>({
        url: `${BASE_URL}/Order/my-orders`,
        method: 'get',
        params,
    })
}


export async function apiGetOrderDetail<T, U>(data: GetOrderByIdRequest) {

    const params = {
        id: data.orderId,
    }

    return ApiService.fetchData<T>({
        url: `${BASE_URL}/Order/${params.id}`,
        method: 'get',
    })
}

export async function apiGetOrderStatuses<T>() {
    return ApiService.fetchData<T>({
        url: `${BASE_URL}/OrderStatuses`,
        method: 'get',
    })
}

export async function apiCreateOrder<T, U>(data: OrderItemDTO[]) {

    console.log('Payload: ' + JSON.stringify(data))
    return ApiService.fetchData<T>({
        url: `${BASE_URL}/Order`,
        method: 'post',
        data
    })
}