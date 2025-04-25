import BaseService from './BaseService'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const ApiService = {
    fetchData<Response = unknown, Request = Record<string, unknown> | unknown[]>(
        param: AxiosRequestConfig<Request>
    ) {
        console.log('Sending request with params:', param);
        return new Promise<AxiosResponse<Response>>((resolve, reject) => {
            BaseService(param)
                .then((response: AxiosResponse<Response>) => {
                    console.log('Response received:', response);
                    resolve(response)
                })
                .catch((errors: AxiosError) => {
                    console.error('Error in BaseService:', errors);
                    reject(errors)
                })
        })
    },
}

export default ApiService
