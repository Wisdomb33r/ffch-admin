import {Objet} from './objet.model';
import {isNullOrUndefined} from 'util';

export class ObjetsComparingContainer {

  public constructor(public objet: Objet,
                     public dbObjet: Objet) {

  }

  public isPresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.objet.id);
  }

  public isDifferentFromFfchDb(): boolean {
    return this.isNomDifferent();
  }

  private isNomDifferent(): boolean {
    if (isNullOrUndefined(this.dbObjet)) {
      return false;
    } else {
      return this.objet.nom !== this.dbObjet.nom;
    }
  }
}
