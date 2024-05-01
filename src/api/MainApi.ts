import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import AbstractApi from './AbstractApi'

// const standaloneInstance = axios.create({
//     baseURL: USERS_API_URL,
//     timeout: 60000
// })

// axiosRetry(standaloneInstance, {
//     retries: 3,
//     retryDelay: axiosRetry.exponentialDelay
// })

// class UsersApi extends AbstractApi {

//     private static instance: UsersApi

//     public static getInstance() : UsersApi {
//         if (!UsersApi.instance) {
//             throw new Error('Initialize instance before.')
//         }
//         return UsersApi.instance
//     }

//     public static initInstance(token: string) : void {
//         UsersApi.instance = new UsersApi(USERS_API_URL, token)
//     }

//     public async getUsers(): Promise<Array<User>> {
//         try {
//             const response = await this.service.get('/user')
//             return response.data
//         } catch(err) {
//             throw AbstractApi.handleError(err)
//         }
//     }