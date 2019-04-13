import {Recette} from './recette.model';
import {isNullOrUndefined} from 'util';
import {FfbeUtils} from '../utils/ffbe-utils';

export class RecettesComparingContainer {
  public constructor(public recette: Recette,
                     public dbRecette: Recette) {
  }

  public isPresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.recette.id);
  }

  public isDifferentFromFfchDb(): boolean {
    return this.isRecetteDifferent()
      || this.isResultatDifferent()
      || this.isFormuleDifferent()
      || this.isNombreResultatsDifferent()
      ;
  }

  private isRecetteDifferent(): boolean {
    if (isNullOrUndefined(this.dbRecette)) {
      return false;
    } else {
      return this.recette.recette_gumi_id !== this.dbRecette.recette_gumi_id;
    }
  }

  private isResultatDifferent(): boolean {
    if (isNullOrUndefined(this.dbRecette)) {
      return false;
    } else {
      return this.recette.resultat !== this.dbRecette.resultat;
    }
  }

  private isFormuleDifferent(): boolean {
    if (isNullOrUndefined(this.dbRecette)) {
      return false;
    } else {
      return this.recette.formule.isEqual(this.dbRecette.formule);
    }
  }

  private isNombreResultatsDifferent(): boolean {
    if (isNullOrUndefined(this.dbRecette)) {
      return false;
    } else {
      return FfbeUtils.checkIfNumbersDifferent(this.recette.nb_resultat, this.dbRecette.nb_resultat);
    }
  }
}
