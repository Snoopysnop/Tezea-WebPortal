import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import AbstractApi from './AbstractApi'
import { Customer, User, WorkSiteRequest, WorkSite } from './Model'
import { CustomerJson, UserJson, WorkSiteRequestJson, WorkSiteJson, EmergencyDetailsJson } from './ModelJson'

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

    public static getInstance() : MainApi {
        if (!MainApi.instance) {
            throw new Error('Initialize instance before.')
        }
        return MainApi.instance
    }

    public static initInstance(token?: string) : void {
        MainApi.instance = new MainApi(process.env.REACT_APP_URL as any)
    }


    //Users-------------------------------------------------------------------------------------------------------------

    public async getUsers(): Promise<Array<User>> {
        try {
            const response = await this.service.get('/api/users', {
                headers: {'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkYU9GRkFVd01aWG92RmtwTVZWUXZvdjRfY1BHcDZ0OUd4QXNGY0FMRUV3In0.eyJleHAiOjE3MTQ3Nzc3NjcsImlhdCI6MTcxNDc3NzQ2NywianRpIjoiOGZjNzRiMjAtZmI4NS00NTNhLWJjOGYtZmUyNDRmNzY2ZTRjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9UZXplYSIsInN1YiI6IjU2ZGFlMDE2LWFhNDEtNDQwNi04YjU3LTM4MjUwMzMwZDc0NCIsInR5cCI6IkJlYXJlciIsImF6cCI6InRlemVhLWFwcCIsInNlc3Npb25fc3RhdGUiOiJkMDY0YjEzMi04Y2Q1LTQ5YTctYjQyNi1lOWIxZGE0MDE1MjgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWF0bGFzIiwiQ09NTUVSQ0lBTCJdfSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZDA2NGIxMzItOGNkNS00OWE3LWI0MjYtZTliMWRhNDAxNTI4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.lJrkYggFbxCeSwiWhgnU48qt_kZPEAjd8yDAW_2NI_RAnI1CPlYR4JEf_UF9wq2k4P9EYV3vhMz6zFcqoMoO-TCMgZyvvROWVdOdEHpwj0gRF5MhmT7IfzuhU-7ihbNmwKmFDI2Py95qcZRQoGj9aDN6pflsU5rrU-yTK2vmZW5HglpWO6TwAGDd55BqF3LUL6FQCBTrgdzPDsvc9RazhjVJyHVlUo1dTVD5H8mypXRQdlO_Wh415nmOQxR1b24U80dWEb6Ah9I9lvbCcW9_QARVLvMVTtVGN321CQPb0K3xaM7UBlxDP-OnzYsjQFNdYoM95ikNuY1c5jdXzuDpWA'}
            })
            return response.data as Array<User>
        } catch(err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async getUserbyId(id: string): Promise<User> {
        try {
            const response = await this.service.get(`/api/users/${id}`)
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
            const response = await this.service.post(`/api/users/create`)
            return response.data as User
        } catch(err) {
            throw AbstractApi.handleError(err)
        }
    }

    //WorksiteRequest-------------------------------------------------------------------------------------------------------------

    public async createWorkSiteRequest(workSiteRequestData: WorkSiteRequestJson): Promise<WorkSiteRequestJson> {
        try {
            const response = await this.service.post<WorkSiteRequestJson>(`/api/workSiteRequests/create`, workSiteRequestData);
            return response.data;
        } catch(err) {
            throw AbstractApi.handleError(err);
        }
    }

    public async getWorkSiteRequests(sortString: string): Promise<Array<WorkSiteRequestJson>> {
        try {
            const response = await this.service.get('/api/workSiteRequests', {
                headers: {'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkYU9GRkFVd01aWG92RmtwTVZWUXZvdjRfY1BHcDZ0OUd4QXNGY0FMRUV3In0.eyJleHAiOjE3MTQ3Nzc3NjcsImlhdCI6MTcxNDc3NzQ2NywianRpIjoiOGZjNzRiMjAtZmI4NS00NTNhLWJjOGYtZmUyNDRmNzY2ZTRjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9UZXplYSIsInN1YiI6IjU2ZGFlMDE2LWFhNDEtNDQwNi04YjU3LTM4MjUwMzMwZDc0NCIsInR5cCI6IkJlYXJlciIsImF6cCI6InRlemVhLWFwcCIsInNlc3Npb25fc3RhdGUiOiJkMDY0YjEzMi04Y2Q1LTQ5YTctYjQyNi1lOWIxZGE0MDE1MjgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWF0bGFzIiwiQ09NTUVSQ0lBTCJdfSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZDA2NGIxMzItOGNkNS00OWE3LWI0MjYtZTliMWRhNDAxNTI4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.lJrkYggFbxCeSwiWhgnU48qt_kZPEAjd8yDAW_2NI_RAnI1CPlYR4JEf_UF9wq2k4P9EYV3vhMz6zFcqoMoO-TCMgZyvvROWVdOdEHpwj0gRF5MhmT7IfzuhU-7ihbNmwKmFDI2Py95qcZRQoGj9aDN6pflsU5rrU-yTK2vmZW5HglpWO6TwAGDd55BqF3LUL6FQCBTrgdzPDsvc9RazhjVJyHVlUo1dTVD5H8mypXRQdlO_Wh415nmOQxR1b24U80dWEb6Ah9I9lvbCcW9_QARVLvMVTtVGN321CQPb0K3xaM7UBlxDP-OnzYsjQFNdYoM95ikNuY1c5jdXzuDpWA'}
            })
            return response.data as Array<WorkSiteRequestJson>
        } catch(err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async getWorksiteRequestbyId(id: number): Promise<WorkSiteRequestJson> {
        try {
            const response = await this.service.get(`/api/workSiteRequests/${id}`)
            return response.data as WorkSiteRequestJson
        } catch(err) {
            throw AbstractApi.handleError(err)
        }
    }

    //Customer-------------------------------------------------------------------------------------------------------------


    public async getCustomerbyId(id: string): Promise<CustomerJson> {
        try {
            const response = await this.service.get(`/api/customers/${id}`)
            return response.data as CustomerJson
        } catch(err) {
            throw AbstractApi.handleError(err)
        }
    }

    //Worksite-------------------------------------------------------------------------------------------------------------

    public async createWorkSite(workSiteRequestData: WorkSiteJson): Promise<WorkSiteJson> {
        try {
            const response = await this.service.post<WorkSiteJson>(`/api/workSiteRequests/create`, workSiteRequestData);
            return response.data;
        } catch(err) {
            throw AbstractApi.handleError(err);
        }
    }

    public async getWorkSites(): Promise<Array<WorkSiteJson>> {
        try {
            const response = await this.service.get('/api/worksites', {
                headers: {'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkYU9GRkFVd01aWG92RmtwTVZWUXZvdjRfY1BHcDZ0OUd4QXNGY0FMRUV3In0.eyJleHAiOjE3MTQ3Nzc3NjcsImlhdCI6MTcxNDc3NzQ2NywianRpIjoiOGZjNzRiMjAtZmI4NS00NTNhLWJjOGYtZmUyNDRmNzY2ZTRjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9UZXplYSIsInN1YiI6IjU2ZGFlMDE2LWFhNDEtNDQwNi04YjU3LTM4MjUwMzMwZDc0NCIsInR5cCI6IkJlYXJlciIsImF6cCI6InRlemVhLWFwcCIsInNlc3Npb25fc3RhdGUiOiJkMDY0YjEzMi04Y2Q1LTQ5YTctYjQyNi1lOWIxZGE0MDE1MjgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWF0bGFzIiwiQ09NTUVSQ0lBTCJdfSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZDA2NGIxMzItOGNkNS00OWE3LWI0MjYtZTliMWRhNDAxNTI4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.lJrkYggFbxCeSwiWhgnU48qt_kZPEAjd8yDAW_2NI_RAnI1CPlYR4JEf_UF9wq2k4P9EYV3vhMz6zFcqoMoO-TCMgZyvvROWVdOdEHpwj0gRF5MhmT7IfzuhU-7ihbNmwKmFDI2Py95qcZRQoGj9aDN6pflsU5rrU-yTK2vmZW5HglpWO6TwAGDd55BqF3LUL6FQCBTrgdzPDsvc9RazhjVJyHVlUo1dTVD5H8mypXRQdlO_Wh415nmOQxR1b24U80dWEb6Ah9I9lvbCcW9_QARVLvMVTtVGN321CQPb0K3xaM7UBlxDP-OnzYsjQFNdYoM95ikNuY1c5jdXzuDpWA'}
            })
            return response.data as Array<WorkSiteJson>
        } catch(err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async getWorksitebyId(id: string): Promise<WorkSiteJson> {
        try {
            const response = await this.service.get(`/api/worksites/${id}`)
            return response.data as WorkSiteJson
        } catch(err) {
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
            const response = await this.service.get('/api/worksites/incidents', {
                headers: {'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkYU9GRkFVd01aWG92RmtwTVZWUXZvdjRfY1BHcDZ0OUd4QXNGY0FMRUV3In0.eyJleHAiOjE3MTQ3Nzc3NjcsImlhdCI6MTcxNDc3NzQ2NywianRpIjoiOGZjNzRiMjAtZmI4NS00NTNhLWJjOGYtZmUyNDRmNzY2ZTRjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9UZXplYSIsInN1YiI6IjU2ZGFlMDE2LWFhNDEtNDQwNi04YjU3LTM4MjUwMzMwZDc0NCIsInR5cCI6IkJlYXJlciIsImF6cCI6InRlemVhLWFwcCIsInNlc3Npb25fc3RhdGUiOiJkMDY0YjEzMi04Y2Q1LTQ5YTctYjQyNi1lOWIxZGE0MDE1MjgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLWF0bGFzIiwiQ09NTUVSQ0lBTCJdfSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZDA2NGIxMzItOGNkNS00OWE3LWI0MjYtZTliMWRhNDAxNTI4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.lJrkYggFbxCeSwiWhgnU48qt_kZPEAjd8yDAW_2NI_RAnI1CPlYR4JEf_UF9wq2k4P9EYV3vhMz6zFcqoMoO-TCMgZyvvROWVdOdEHpwj0gRF5MhmT7IfzuhU-7ihbNmwKmFDI2Py95qcZRQoGj9aDN6pflsU5rrU-yTK2vmZW5HglpWO6TwAGDd55BqF3LUL6FQCBTrgdzPDsvc9RazhjVJyHVlUo1dTVD5H8mypXRQdlO_Wh415nmOQxR1b24U80dWEb6Ah9I9lvbCcW9_QARVLvMVTtVGN321CQPb0K3xaM7UBlxDP-OnzYsjQFNdYoM95ikNuY1c5jdXzuDpWA'}
            })
            return response.data as Array<EmergencyDetailsJson>
        } catch(err) {
            throw AbstractApi.handleError(err)
        }
    }

    public async createEmergency(EmergencyData: EmergencyDetailsJson): Promise<EmergencyDetailsJson> {
        try {
            const response = await this.service.post<EmergencyDetailsJson>(`/api/worksites/incidents/create`, EmergencyData);
            return response.data as EmergencyDetailsJson;
        } catch(err) {
            throw AbstractApi.handleError(err);
        }
    }

        //WorkSiteChief-------------------------------------------------------------------------------------------------------------
        public async getWorksiteChiefbyId(id: string): Promise<User> {
            try {
                const response = await this.service.get(`/api/users/${id}/workSites`)
                return response.data as User
            } catch(err) {
                throw AbstractApi.handleError(err)
            }
        }

}

export default MainApi