import axios, { AxiosResponse, AxiosError } from 'axios';

axios.defaults.baseURL = 'http://localhost:9000/api';

const errorHandler = async (res: AxiosError): Promise<Error> => {
    let errorTemplate = "Erreur de communication avec le server";
    let errorMessage = res.response ? (res.response.data ? res.response.data.errorMessage : errorTemplate) : errorTemplate;
    return Promise.reject(new Error(errorMessage));
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

    public async getById(id: string): Promise<any> {
        try {
            let recipe = await axios.get(`/recipe/${id}`)
            return recipe.data;
        } catch (res) {
            return errorHandler(res);
        }
    }
}

export const recipesServices = new RecipesServices();