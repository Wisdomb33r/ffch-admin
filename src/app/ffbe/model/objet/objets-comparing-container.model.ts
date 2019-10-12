import {Objet} from './objet.model';
import {FfbeUtils} from '../../utils/ffbe-utils';

export class ObjetsComparingContainer {

  public constructor(public objet: Objet,
                     public dbObjet: Objet) {

  }

  public isPresentInFfchDb(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.objet.id);
  }

  public isDifferentFromFfchDb(): boolean {
    return this.isNomDifferent();
  }

  private isNomDifferent(): boolean {
    if (FfbeUtils.isNullOrUndefined(this.dbObjet)) {
      return false;
    } else {
      return this.objet.nom !== this.dbObjet.nom;
    }
  }
}
