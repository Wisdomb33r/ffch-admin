import {Caracteristiques} from './caracteristiques.model';
import {FfbeUtils} from '../utils/ffbe-utils';

export class TetraCaracteristiques {

  public constructor(
    public caracInconditionnelles: Caracteristiques,
    public caracDoubleHand: Caracteristiques,
    public caracTrueDoubleHand: Caracteristiques,
    public caracTrueDualWield: Caracteristiques
  ) {
  }

  public static newEmptyTetraCaracteristiques(): TetraCaracteristiques {
    return new TetraCaracteristiques(null, null, null, null);
  }

}
