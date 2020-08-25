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
    return new TetraCaracteristiques(Caracteristiques.newEmptyCaracteristiques(), Caracteristiques.newEmptyCaracteristiques(), Caracteristiques.newEmptyCaracteristiques(), Caracteristiques.newEmptyCaracteristiques());
  }

  public static produce(tc: TetraCaracteristiques): TetraCaracteristiques {
    return new TetraCaracteristiques(tc.caracInconditionnelles,
      tc.caracDoubleHand, tc.caracTrueDoubleHand, tc.caracTrueDualWield);
  }

}
