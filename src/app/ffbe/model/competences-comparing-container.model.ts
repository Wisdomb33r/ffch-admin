import {Competence} from './competence.model';
import {isNullOrUndefined} from 'util';
import {FfbeUtils} from '../utils/ffbe-utils';

export class CompetencesComparingContainer {
  public constructor(public competence: Competence,
                     public dbCompetence: Competence,
                     public modifiedCompetence: Competence) {
  }

  public isPresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.competence.id);
  }

  public isDifferentFromFfchDb(): boolean {
    return this.isNomDifferent()
      || this.isDescriptionDifferent()
      || this.isPmDifferent()
      || this.isEpDifferent()
      || this.isLbDifferent()
      || this.isHitsDifferent()
      || this.isFramesDifferent()
      || this.isDamagesDifferent()
      ;
  }

  private isNomDifferent(): boolean {
    if (isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return this.competence.nom !== this.dbCompetence.nom;
    }
  }

  private isDescriptionDifferent(): boolean {
    if (isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return this.competence.description !== this.dbCompetence.description;
    }
  }

  private isPmDifferent(): boolean {
    if (isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.competence.pm, this.dbCompetence.pm);
    }
  }

  private isEpDifferent(): boolean {
    if (isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.competence.ep, this.dbCompetence.ep);
    }
  }

  private isLbDifferent(): boolean {
    if (isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.competence.lb, this.dbCompetence.lb);
    }
  }

  private isHitsDifferent(): boolean {
    if (isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.competence.hits, this.dbCompetence.hits);
    }
  }

  private isFramesDifferent(): boolean {
    if (isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return FfbeUtils.checkIfStringsDifferent(this.competence.frames, this.dbCompetence.frames);
    }
  }

  private isDamagesDifferent(): boolean {
    if (isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return FfbeUtils.checkIfStringsDifferent(this.competence.damages, this.dbCompetence.damages);
    }
  }
}
