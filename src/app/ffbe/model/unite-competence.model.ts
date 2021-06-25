import {Competence} from './competence.model';

export enum UniteCompetenceStatus {
  Correct = 'Correct',
  LevelMismatch = 'LevelMismatch',
  NotFoundInCounterPart = 'NotFoundInCounterPart',
}

export class UniteCompetence {
  constructor(
    public competence: Competence,
    public niveau: number
  ) {
  }

  public status: UniteCompetenceStatus;
}
