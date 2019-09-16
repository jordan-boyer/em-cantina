import { IRecipe } from './recipes';
export enum Difficulty {
    PADAWAN = "padawan",
    JEDI = "jedi",
    MAITRE = "maitre"
}

export enum Unit {
    CENTILITRE = "cl",
    MILLILITRE = "ml",
    LITRE = "l",
    KILOGRAME = "kg",
    GRAMME = "g",
}

export type UnitString = keyof typeof Unit;

export interface IRecipe {
    id: number | null;
    titre: string;
    description: string;
    niveau: Difficulty;
    etapes: string[];
    personnes: number;
    photo: string;
    tempsPreparation: number;
    ingredients: string[][];
}

export const BaseRecipe: IRecipe = {
    id: null,
    titre: "",
    description: "",
    niveau: Difficulty.PADAWAN,
    etapes: [""],
    personnes: 0,
    photo: "",
    tempsPreparation: 0,
    ingredients: [["","",""]]
}

export type RecipeType = keyof typeof BaseRecipe;