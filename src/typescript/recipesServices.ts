import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:9000/api';

const errorHandler = (res: AxiosResponse) => {
    console.log(res);
    return Promise.reject(new Error("Error"));
}

class RecipesServices {
    constructor() {
        console.log('recipesService created');
    }

    async getAll() : Promise<any> {
        try {
            let recipes = await axios.get('/recipes');

            return recipes.data;
        } catch (res) {
            return errorHandler(res);
        }   
    }
}

export const recipesServices = new RecipesServices();