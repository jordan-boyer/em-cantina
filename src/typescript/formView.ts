import Vue from 'vue';
import Component from 'vue-class-component';
import { Difficulty, Unit } from './recipes';

@Component
export default class Form extends Vue {
    public difficulty = Difficulty;
    public ingredients: string[][] = [["",""]];
}