import { Difficulty } from './recipes';

interface IMinMax {
    min: number | "",
    max: number | ""
}

export interface IFilters {
    title: string,
    difficulty: Difficulty | "",
    nbPersons: IMinMax,
    time: number | ""
}