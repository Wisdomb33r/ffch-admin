import {Recette} from './recette.model';
import {FfbeUtils} from '../utils/ffbe-utils';

export class RecettesComparingContainer {
  public constructor(public recette: Recette,
                     public dbRecette: Recette) {
  }

  public isPresentInFfchDb(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.recette.id);
  }

  public isDifferentFromFfchDb(): boolean {
    return this.isRecetteDifferent()
      || this.isResultatDifferent()
      || this.isFormuleDifferent()
      || this.isNombreResultatsDifferent()
      ;
  }

  private isRecetteDifferent(): boolean {
    if (FfbeUtils.isNullOrUndefined(this.dbRecette)) {
      return false;
    } else {
      return this.recette.recette_gumi_id !== this.dbRecette.recette_gumi_id;
    }
  }

  private isResultatDifferent(): boolean {
    if (FfbeUtils.isNullOrUndefined(this.dbRecette)) {
      return false;
    } else {
      return this.recette.resultat !== this.dbRecette.resultat;
    }
  }

  private isFormuleDifferent(): boolean {
    if (FfbeUtils.isNullOrUndefined(this.dbRecette)) {
      return false;
    } else {
      return this.recette.formule.isEqual(this.dbRecette.formule);
    }
  }

  private isNombreResultatsDifferent(): boolean {
    if (FfbeUtils.isNullOrUndefined(this.dbRecette)) {
      return false;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.recette.nb_resultat, this.dbRecette.nb_resultat);
    }
  }
}
