import {isNullOrUndefined} from 'util';
import {FfbeUtils} from '../utils/ffbe-utils';

export class Competence {
  public id: number;
  public physique: string;
  public magique: string;
  public hybride: string;
  public isDifferent = false;

  constructor(public gumi_id: number,
              public categorie: number,
              public icone: number,
              public nom: string,
              public nom_en: string,
              public description: string,
              public description_en: string,
              public effet: string,
              public effet_en: string,
              public puissance: number,
              public pm: number,
              public hits: number,
              public frames: string,
              public damages: string) {
  }

  public isPresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.id) && !this.isDifferent;
  }

  public isDifferentFromFfchDb(): boolean {
    return !isNullOrUndefined(this.id) && this.isDifferent;
  }

  public isAbsentFromFfchDb(): boolean {
    return isNullOrUndefined(this.id);
  }

  public initializeFfchId(competence: Competence): Competence {
    if (!isNullOrUndefined(competence) && !isNullOrUndefined(competence.id)) {
      this.id = competence.id;
    }
    return this;
  }

  public compareWithFfchCompetence(competence: Competence): Competence {
    if (!isNullOrUndefined(competence)) {
      this.isDifferent = this.isDifferent || FfbeUtils.checkIfStringsDifferent(this.description, competence.description);
      this.isDifferent = this.isDifferent || FfbeUtils.checkIfNumbersDifferent(this.pm, competence.pm);
      this.isDifferent = this.isDifferent || FfbeUtils.checkIfStringsDifferent(this.frames, competence.frames);
      this.isDifferent = this.isDifferent || FfbeUtils.checkIfStringsDifferent(this.damages, competence.damages);
      this.isDifferent = this.isDifferent || FfbeUtils.checkIfNumbersDifferent(this.categorie, competence.categorie);
    }
    return this;
  }
}
