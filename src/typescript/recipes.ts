export enum Difficulty {
    PADAWAN = "padawan",
    JEDI = "jedi",
    MAITRE = "maître"
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