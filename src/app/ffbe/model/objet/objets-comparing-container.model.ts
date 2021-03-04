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
    return this.objet.isDifferent(this.dbObjet);
  }
}
