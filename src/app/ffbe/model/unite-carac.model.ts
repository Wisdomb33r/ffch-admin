import {Caracteristiques} from './caracteristiques.model';

export class UniteCarac {
  constructor(
    public level: number,
    public level_max: number,
    public base: Caracteristiques,
    public pots: Caracteristiques
  ) { }
}
