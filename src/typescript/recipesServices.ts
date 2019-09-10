import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:9000/api';

const errorHandler = async (res: AxiosResponse): Promise<Error> => {
    console.log(res);
    return Promise.reject(new Error("Error"));
};

class RecipesServices {
    public constructor() {
        console.log('recipesService created');
    }

    public async getAll(): Promise<any> {
        try {
            let recipes = await axios.get('/recipes');

            return recipes.data;
        } catch (res) {
            return errorHandler(res);
        }   
    }
}

export const recipesServices = new RecipesServices();