import {Caracteristiques} from './caracteristiques.model';

export interface CaracteristiquesContainer {
  getBase(): Caracteristiques;

  getPots(): Caracteristiques;

  getBonusBasePercent(): Caracteristiques;
}
