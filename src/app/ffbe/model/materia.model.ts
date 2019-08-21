import {MateriaStrings} from './materia-strings.model';
import {Skill} from './skill.model';

export class Materia {
  gumi_id: number;
  name: string;
  skills: Array<number>;
  dmSkills: Array<Skill>;
  effects: Array<string>;
  price_sell: number;
  strings: MateriaStrings;
}
