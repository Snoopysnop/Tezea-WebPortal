import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import AbstractApi from './AbstractApi'
import { hashPassword } from '../common/utils/utils'
import Keycloak from 'keycloak-js';

const standaloneInstance = axios.create({
    baseURL: process.env.REACT_APP_URL,
    timeout: 60000
})

const keycloak = new Keycloak({
    url: '/auth',
    realm: 'Tezea',
    clientId: 'tezea-public',
});

axiosRetry(standaloneInstance, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay
})

class KeycloakApi extends AbstractApi {

    private static instance: KeycloakApi

    public static getInstance(): KeycloakApi {
        if (!KeycloakApi.instance) {
            throw new Error('Initialize instance before.')
        }
        return KeycloakApi.instance
    }

    public static initInstance(token?: string): void {
        KeycloakApi.instance = new KeycloakApi(process.env.REACT_APP_URL as any)

    }

    public async auth() {
        try {
            const authenticated = await keycloak.init({
                onLoad: 'login-required'
            });
            console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
        } catch (error) {
            console.error('Failed to initialize adapter:', error);
        }
    }

    public async login(username: string, password: string): Promise<void> {
        try {
            //const hashedPassword: string = hashPassword(password);
            const formData = new URLSearchParams();

            formData.append('username', username);
            formData.append('password', password);
            formData.append('grant_type', process.env.REACT_APP_GRANT_TYPE!);
            formData.append('client_id', process.env.REACT_APP_CLIENT_ID!);
            formData.append('client_secret', process.env.REACT_APP_CLIENT_SECRET!);
            const response = await this.service.post('/realms/Tezea/protocol/openid-connect/token', formData, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            console.log(response)
            if (response.status === 200) {
                const token: string = JSON.parse(response.data)["access_token"].toString();
            } else if (response.status === 401) {
                throw new Error('Wrong username or password ...');
            } else {
                throw new Error(`Erreur : ${response.status}, Réponse : ${response.data}`);
            }
        } catch (err) {
            throw AbstractApi.handleError(err)
        }

    }
}

export default KeycloakApi