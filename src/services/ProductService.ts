import appConfig from "@/configs/app.config";
import ApiService from "./ApiService";
import { AddEditProduct, GenericRequest, GetProductDetailsRequest, GetProductsRequest } from "@/views/Products/types";


const BASE_URL = appConfig.apiPrefix;

export async function apiGetProducts<T, U>(
    data: GetProductsRequest
) {

    console.log("Calling API with request:", data);
    console.log('Data Query: ' + JSON.stringify(data))

    const params = {
        filterOn: data.filterOn ?? 'Name',
        filterQuery: data.filterQuery ?? '',
        sortBy: data.sortBy ?? '',
        isAscending: data.isAscending ?? true,
        pageIndex: data.pageIndex ?? 1,
        pageSize: data.pageSize ?? 10,
    }

    return ApiService.fetchData<T>({
        url: `${BASE_URL}/Products`,
        method: 'get',
        params,
    })
}

export async function apiGetProductDetail<T, U>(data: GetProductDetailsRequest) {

    const params = {
        id: data.id,
    }

    return ApiService.fetchData<T>({
        url: `${BASE_URL}/Products/${params.id}`,
        method: 'get',
    })
}

export async function apiAddProduct<T, U>(data: AddEditProduct) {

    const payload = {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        imageUrl: data.imageUrl,
        category: data.category,
        color: data.color,
        size: data.size,
    }

    return ApiService.fetchData<T>({
        url: `${BASE_URL}/Products`,
        method: 'post',
        data: payload,
    })
}

export async function apiEditProduct<T, U>(data: AddEditProduct) {

    const payload = {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        imageUrl: data.imageUrl,
        category: data.category,
        color: data.color,
        size: data.size,
    }

    const params = {
        id: data.id,
    }

    return ApiService.fetchData<T>({
        url: `${BASE_URL}/Products/${params.id}`,
        method: 'put',
        data: payload,
    })
}

export async function apiDeleteProduct<T>(data: GenericRequest) {
    const params = {
        id: data.id,
    }

    return ApiService.fetchData<T>({
        url: `${BASE_URL}/Products/${params.id}`,
        method: 'delete',
    })
}