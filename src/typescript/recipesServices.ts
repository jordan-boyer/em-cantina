import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:9000/api';

const errorHandler = (res: AxiosResponse) => {
    console.log(res);
    return Promise.reject(new Error("Error"));
}

export default {
    getAll() {
        return axios.get('/recipes')
            .then(res => res.data)
            .catch(errorHandler)
    }
}