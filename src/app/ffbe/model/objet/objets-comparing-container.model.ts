import {Objet} from './objet.model';
import {FfbeUtils} from '../../utils/ffbe-utils';

export class ObjetsComparingContainer {

  public modifiedObjet: Objet;

  public constructor(public objet: Objet,
                     public dbObjet: Objet) {
    this.setupModifiedObjet();
  }

  public isPresentInFfchDb(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.objet.id);
  }

  public isDifferentFromFfchDb(): boolean {
    return this.objet.isDifferent(this.dbObjet);
  }

  private setupModifiedObjet() {
    this.modifiedObjet = Objet.produce(this.objet);
    this.modifiedObjet.effet = this.dbObjet.effet;
    if (FfbeUtils.isNullOrUndefined(this.modifiedObjet.stars)) {
      this.modifiedObjet.stars = this.dbObjet.stars;
    }
  }
}
