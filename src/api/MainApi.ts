import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import AbstractApi from './AbstractApi'
import { Role, Customer, User, WorkSiteRequest, WorkSite, TimeLine, Tool } from './Model'
import { hashPassword } from '../common/utils/utils'
import { CustomerJson, UserJson, WorkSiteRequestJson, WorkSiteJson, EmergencyDetailsJson, EmergencyDetailsJsonToSend } from './ModelJson'
import { stringify } from 'querystring'

const standaloneInstance = axios.create({
    baseURL: process.env.REACT_APP_URL,
    timeout: 60000
})

axiosRetry(standaloneInstance, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay
})

class MainApi extends AbstractApi {

    private static instance: MainApi

    public static getInstance(): MainApi {
        if (!MainApi.instance) {
            throw new Error('Initialize instance before.')
        }
        return MainApi.instance
    }

    public static initInstance(token?: string) : void {
        console.log(token)
        MainApi.instance = new MainApi(process.env.REACT_APP_URL as any, token)
    }


    //Users-------------------------------------------------------------------------------------------------------------

    public async getUsers(): Promise<Array<User>> {
        try {
            const response = await this.service.get('/api/users')
            return response.data as Array<User>
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async getUserbyId(id: string): Promise<User> {
        try {
            const response = await this.service.get(`/api/users/${id}`)
            return response.data as User
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    //WorksiteRequest-------------------------------------------------------------------------------------------------------------

    public async createWorkSiteRequest(workSiteRequestData: WorkSiteRequestJson): Promise<WorkSiteRequestJson> {
        try {
            const response = await this.service.post<WorkSiteRequestJson>(`/api/workSiteRequests/create`, workSiteRequestData);
            return response.data;
        } catch (err) {
            throw AbstractApi.handleError(err);
        }
    }

    public async getWorkSiteRequests(sortString: string): Promise<Array<WorkSiteRequestJson>> {
        try {
            const response = await this.service.get('/api/workSiteRequests')
            return response.data as Array<WorkSiteRequestJson>
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async getWorksiteRequestbyId(id: number): Promise<WorkSiteRequestJson> {
        try {
            const response = await this.service.get(`/api/workSiteRequests/${id}`)
            return response.data as WorkSiteRequestJson
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    //Customer-------------------------------------------------------------------------------------------------------------


    public async getCustomerbyId(id: string): Promise<CustomerJson> {
        try {
            const response = await this.service.get(`/api/customers/${id}`)
            return response.data as CustomerJson
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    //Worksite-------------------------------------------------------------------------------------------------------------

    public async createWorkSite(workSiteRequestData: WorkSiteJson): Promise<WorkSiteJson> {
        try {
            
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const response = await this.service.post<WorkSiteJson>(`/api/worksites/create`, workSiteRequestData, config);
            return response.data;
        } catch (err) {
            throw AbstractApi.handleError(err);
        }
    }

    public async getWorkSites(): Promise<Array<WorkSiteJson>> {
        try {
            const response = await this.service.get('/api/worksites')
            return response.data as Array<WorkSiteJson>
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async getWorksitebyId(id: string): Promise<WorkSiteJson> {
        try {
            const response = await this.service.get(`/api/worksites/${id}`)
            return response.data as WorkSiteJson
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async getUsersByWorksiteId(id: string): Promise<Array<User>> {
        try {
            const response = await this.service.get(`/api/worksites/${id}/allUsers`)
            return response.data as Array<User>
        } catch(err) {
            throw AbstractApi.handleError(err)
        }
    }
    //Incidents-------------------------------------------------------------------------------------------------------------

    public async getEmergencies(): Promise<Array<EmergencyDetailsJson>> {
        try {
            const response = await this.service.get('/api/worksites/incidents')
            return response.data as Array<EmergencyDetailsJson>
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async createEmergency(emergencyData: EmergencyDetailsJson, id: string): Promise<EmergencyDetailsJson> {
        try {

            const config = {
                headers: { 
                    'Content-Type': 'application/json'
                }
            }

            /*
            const temp = {
                level: "Minor",
                title: "string",
                description: "string",
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                evidences: [
                  [
                    "string"
                  ]
                ],
                workSiteId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
              }*/

              
            const data = JSON.stringify(emergencyData);
            const response = await this.service.put(`/api/worksites/${id}/incident`, data, config);
            return response.data as EmergencyDetailsJson;
        } catch (err) {
            throw AbstractApi.handleError(err);
        }
    }



    //WorkSiteChief-------------------------------------------------------------------------------------------------------------
    public async getWorksiteChiefbyId(id: string): Promise<User> {
        try {
            const response = await this.service.get(`/api/users/${id}/workSites`)
            return response.data as User
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async getWorksiteChiefAvaibilities(timeLine: TimeLine): Promise<User[]> {
        try {
            const response = await this.service.post(`/api/users/workSiteChiefs/availabilities`, timeLine)
            return response.data as User[]
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }
    //Staff-------------------------------------------------------------------------------------------------------------

    public async getStaffAvaibilities(timeLine: TimeLine): Promise<User[]> {
        try {
            const response = await this.service.post(`/api/users/staff/availabilities`, timeLine);
            return response.data as User[]
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    //Tools-------------------------------------------------------------------------------------------------------------

    public async getToolAvaibilities(timeLine: TimeLine): Promise<any> {
        try {
            const response = await this.service.post(`/api/tools/availabilities`, timeLine);
            return response.data
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }
}

export default MainApi