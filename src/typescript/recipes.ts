export enum Difficulty {
    PADAWAN = "padawan",
    JEDI = "jedi",
    MAITRE = "maitre"
}

export enum Unit {
    LITRE = "L",
    CENTILITRE = "cL",
    MILLILITRE = "mL",
    KILOGRAME = "kg",
    GRAMME = "g",
    MILLIGRAMME = "mg"
}

export interface IRecipe {
    id: number;
    titre: string;
    description: string;
    niveau: Difficulty;
    etapes: string[];
    personnes: number;
    photo: string;
    tempsPreparation: number;
    ingredients: string[][];
}