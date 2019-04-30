import {MateriaStrings} from './materia-strings.model';

export class Materia {
  gumi_id: number;
  name: string;
  effects: Array<string>;
  price_sell: number;
  strings: MateriaStrings;
}
