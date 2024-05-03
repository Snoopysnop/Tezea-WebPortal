import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import ApiError from '../common/utils/exceptions/ApiError';

class AbstractApi { 

    protected service: AxiosInstance

    protected constructor(url: string, token?: string) {
        if (this.constructor === AbstractApi) {
            throw new TypeError('Abstract class "AbstractApi" cannot be instantiated directly');
        }
        this.service = axios.create({
            baseURL: url,
            timeout: 60000,
            // headers: {
            //     'Authorization': 'Bearer ' + token
            // }
        })

        axiosRetry(this.service, {
            retries: 3,
            retryDelay: axiosRetry.exponentialDelay
        })
    }

    protected static handleError(err: unknown): unknown {
        if (axios.isAxiosError(err)) {
            if (err.response) {
                if (err.response.data && err.response.data.error) {
                    const error = err.response.data.error
                    return new ApiError(err.response.status, error.type, error.message, error.errors)
                } 
            } else if (err.request) {
                console.log(err.toJSON())

                return new Error('Network error')
            }
        }
        return err
    }

    protected static async handleBlobError(err: unknown): Promise<unknown> {
        if (axios.isAxiosError(err)) {
            if (err.response) {
                let data = err.response.data
                if (err.request.responseType === "blob") {
                    data = JSON.parse(await data.text());
                }
                if (data && data.error) {
                    const error = data.error
                    return new ApiError(err.response.status, error.type, error.message, error.errors)
                } 
            } else if (err.request) {
                console.log('A')
                console.log(err)
                console.log('B')
                console.log(JSON.stringify(err))
                console.log('C')
                console.log(err.request)
                console.log('D')
                console.log(JSON.stringify(err.request))
                console.log('E')
                return new Error('Network error')
            }
        }
        return err
    }
}

export default AbstractApi