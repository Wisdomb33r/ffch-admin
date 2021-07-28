import {Competence} from './competence.model';

export enum UniteCompetenceStatus {
  Correct = 'Correct',
  LevelMismatch = 'LevelMismatch',
  LevelAndActivationMismatch = 'LevelAndActivationMismatch',
  NotFoundInCounterPart = 'NotFoundInCounterPart',
}

export class UniteCompetence {

  public id;
  public competence: Competence;
  public niveau: number;
  public status: UniteCompetenceStatus;

  constructor(
    competence: Competence,
    niveau: number
  ) {
    this.competence = competence;
    this.niveau = niveau;
  }


  /*
  // TODO: Replace static implementation with this methods during #507
  public isActivatedCompetence(): boolean {
    return Number.isInteger(this.niveau) && this.niveau > -1000 && this.niveau < 0;
  }*/

  public static isActivatedCompetence(uniteCompetence): boolean {
    return Number.isInteger(uniteCompetence.niveau) && uniteCompetence.niveau > -1000 && uniteCompetence.niveau < 0;
  }
}
