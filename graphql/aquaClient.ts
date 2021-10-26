import axios, { AxiosStatic, AxiosInstance } from 'axios';
import {configuration} from '../configuration'

class AquaClient {
    axios: AxiosInstance;

    constructor(public baseURL: string = `${configuration.api}/graphql`, public headers?: string) {
        this.axios = axios.create({ baseURL })
    }

    query({ query, variables }) {
        return this.axios.post('', {
            query,
            variables
        })
    }

    mutation({ mutation, variables }) {
        return this.axios.post('', {
            query: mutation,
            variables
        })
    }
}

export default AquaClient