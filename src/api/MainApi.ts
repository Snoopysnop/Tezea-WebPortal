import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import AbstractApi from './AbstractApi'
import { User } from './Model'

const standaloneInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 60000
})

axiosRetry(standaloneInstance, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay
})

class MainApi extends AbstractApi {

    private static instance: MainApi

    public static getInstance() : MainApi {
        if (!MainApi.instance) {
            throw new Error('Initialize instance before.')
        }
        return MainApi.instance
    }

    public static initInstance(token?: string) : void {
        MainApi.instance = new MainApi(process.env.REACT_APP_API_URL as any)
    }

    public async getUsers(): Promise<Array<User>> {
        try {
            const response = await this.service.get('/users')
            return response.data as Array<User>
        } catch(err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async getUserbyId(id: number): Promise<User> {
        try {
            const response = await this.service.get(`/users/${id}`)
            return response.data as User
        } catch(err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async createUser(user: User): Promise<User> {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const response = await this.service.post(`/users/create`)
            return response.data as User
        } catch(err) {
            throw AbstractApi.handleError(err)
        }
    }
}

export default MainApi