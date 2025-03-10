import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import AbstractApi from './AbstractApi'
import { Role, Customer, User, WorkSiteRequest, WorkSite, TimeLine, Tool } from './Model'
import { getRole, hashPassword } from '../common/utils/utils'
import { CustomerJson, UserJson, WorkSiteRequestJson, WorkSiteJson, EmergencyDetailsJson, EmergencyDetailsJsonToSend, WorkSiteJsonChelou } from './ModelJson'
import { stringify } from 'querystring'
import KeycloakApi from './KeycloakApi'

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

    public async createUser(email: string, firstname: string, lastname: string, phoneNumber: string, role: Role, password: string): Promise<void> {
        try {
            const hashedPassword = hashPassword(password);
            const user: User = {
                email: email, 
                firstName: firstname, 
                lastName: lastname, 
                phoneNumber: phoneNumber, 
                role: getRole(role)
            }
            const formData = new FormData();
            formData.append('user', new Blob([JSON.stringify(user)], { type: "application/json" }));
            formData.append('password', hashedPassword);
            const token = await KeycloakApi.getInstance().getToken()
            await this.service.post("/api/users/create", formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data'
                },
            });
            console.log('User created');

        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    public async getUserbyEmail(email: string): Promise<User> {
        try {
            const response = await this.service.get(`/api/users/email`, {
                params: {
                    email: email,
                }
            });
            return response.data as User
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async getUserbyRole(role: string): Promise<User[]> {
        try {
            const response = await this.service.get(`/api/users/role`, {
                params: {
                    role: role,
                }
            });
            return response.data as User[]
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    //WorksiteRequest-------------------------------------------------------------------------------------------------------------

    public async createWorkSiteRequest(workSiteRequest: WorkSiteRequestJson): Promise<WorkSiteRequestJson> {
        try {
            const response = await this.service.post(`/api/workSiteRequests/create`, workSiteRequest);
            return response.data as WorkSiteRequestJson;
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

    

    public async getRandomConcierge(): Promise<User> {
        try {
            const response = await this.service.get(`/api/users/Concierge`)
            return response.data as User
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async getRandomSiteChief(): Promise<User> {
        try {
            const response = await this.service.get(`/api/users/SiteChief`)
            return response.data as User
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    
    public async updateStatusWorksiteRequest(id: number, status: string): Promise<void> {
        try {
            const response = await this.service.patch(`/api/workSiteRequests/${id}/update_status?status=${status}`)
            return response.data 
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }
   
    public async updateWorksiteRequest(id: number, workSiteRequest : WorkSiteRequestJson): Promise<WorkSiteRequestJson> {
        try {
            const response = await this.service.patch(`/api/workSiteRequests/${id}/patch`,workSiteRequest)
            return response.data as WorkSiteRequestJson
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async getWorksiteStatusOfWorkSiteRequest(ids: number[]): Promise<Map<string,Map<string,string>>> {
        try {
            const response = await this.service.get(`/api/workSiteRequests/statistics/workSitesStatus`, {
                params: {
                    ids: ids.join(',') 
                }
            });
            return response.data 
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }


    //Customer-------------------------------------------------------------------------------------------------------------

    public async updateCustomer(id: string, customer :CustomerJson): Promise<CustomerJson> {
        try {
            const response = await this.service.patch(`/api/customers/${id}/update`,customer)
            return response.data as CustomerJson
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async getCustomerbyId(id: string): Promise<CustomerJson> {
        try {
            const response = await this.service.get(`/api/customers/${id}`)
            return response.data as CustomerJson
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async createCustomer(customer: CustomerJson): Promise<CustomerJson> {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const response = await this.service.post(`/api/customers/create`, customer, config)
            return response.data as CustomerJson
        } catch (err) {
            throw AbstractApi.handleError(err)
        }
    }

    //Worksite-------------------------------------------------------------------------------------------------------------

    public async createWorkSite(workSiteRequestData: WorkSiteJsonChelou): Promise<WorkSiteJson> {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const data = workSiteRequestData
            const response = await this.service.post<WorkSiteJson>(`/api/worksites/create`, data, config);
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

    public async getWorksiteWithAtLeastOneIncident() : Promise<WorkSiteJson[]> {
        try {
            const response = await this.service.get(`/api/worksites/hasIncidents`)
            return response.data as WorkSiteJson[]
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

    public async getIncidentByWorksitesId(id: string): Promise<Array<EmergencyDetailsJson>> {
        try {
            const response = await this.service.get(`/api/worksites/${id}/incidents`)
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