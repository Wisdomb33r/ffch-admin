import {Competence} from './competence.model';
import {FfbeUtils} from '../utils/ffbe-utils';

export class CompetencesComparingContainer {
  public constructor(public competence: Competence,
                     public dbCompetence: Competence,
                     public modifiedCompetence: Competence) {
  }

  public isPresentInFfchDb(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.competence.id);
  }

  public isDifferentFromFfchDb(): boolean {
    return this.isNomDifferent()
      || this.isGumiIdLieDifferent()
      || this.isCategorieDifferente()
      || this.isEffetDifferent()
      || this.isPuissanceDifferente()
      || this.isPmDifferent()
      || this.isEpDifferent()
      || this.isLbDifferent()
      || this.isHitsDifferent()
      || this.isFramesDifferent()
      || this.isDamagesDifferent()
      || this.isDamageTypeDifferent()
      || this.isElementsDifferent()
      ;
  }

  private isGumiIdLieDifferent(): boolean {
    if (!this.dbCompetence) {
      return false;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.competence.gumi_id_lie, this.dbCompetence.gumi_id_lie);
    }
  }

  private isCategorieDifferente(): boolean {
    if (FfbeUtils.isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return +this.competence.categorie !== +this.dbCompetence.categorie;
    }
  }

  private isNomDifferent(): boolean {
    if (FfbeUtils.isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return this.competence.nom !== this.dbCompetence.nom;
    }
  }

  private isEffetDifferent(): boolean {
    if (FfbeUtils.isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return this.competence.effet_fr !== this.dbCompetence.effet;
    }
  }

  private isPuissanceDifferente(): boolean {
    if (FfbeUtils.isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.competence.puissance, this.dbCompetence.puissance);
    }
  }

  private isPmDifferent(): boolean {
    if (FfbeUtils.isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.competence.pm, this.dbCompetence.pm);
    }
  }

  private isEpDifferent(): boolean {
    if (FfbeUtils.isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.competence.ep, this.dbCompetence.ep);
    }
  }

  private isLbDifferent(): boolean {
    if (FfbeUtils.isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.competence.lb, this.dbCompetence.lb);
    }
  }

  private isHitsDifferent(): boolean {
    if (FfbeUtils.isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.competence.hits, this.dbCompetence.hits);
    }
  }

  private isFramesDifferent(): boolean {
    if (FfbeUtils.isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return FfbeUtils.checkIfStringsDifferent(this.competence.frames, this.dbCompetence.frames);
    }
  }

  private isDamagesDifferent(): boolean {
    if (FfbeUtils.isNullOrUndefined(this.dbCompetence)) {
      return false;
    } else {
      return FfbeUtils.checkIfStringsDifferent(this.competence.damages, this.dbCompetence.damages);
    }
  }

  private isDamageTypeDifferent(): boolean {
    if (!this.dbCompetence) {
      return false;
    }
    return this.competence.physique !== this.dbCompetence.physique
      || this.competence.magique !== this.dbCompetence.magique
      || this.competence.hybride !== this.dbCompetence.hybride
      || this.competence.fixe !== this.dbCompetence.fixe
      || this.competence.esper !== this.dbCompetence.esper;
  }

  private isElementsDifferent(): boolean {
    if (!this.dbCompetence) {
      return false;
    }
    return this.competence.elements !== this.dbCompetence.elements;
  }
}
