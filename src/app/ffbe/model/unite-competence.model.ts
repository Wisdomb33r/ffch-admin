import {Competence} from './competence.model';
import {Unite} from './unite.model';

export class UniteCompetence {
  constructor(
    public competence: Competence,
    public niveau: number
  ) { }
}
