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

  public static computeSum(entries: Array<TetraCaracteristiques>): TetraCaracteristiques {
    return entries.reduce((a, b) => a.accumulateByAddition(b), TetraCaracteristiques.newEmptyTetraCaracteristiques());
  }

  public accumulateByAddition(other: TetraCaracteristiques): TetraCaracteristiques {
    if (!FfbeUtils.isNullOrUndefined(other)) {
      this.accumulateCaracteristiquesByAddition(this.caracInconditionnelles, other.caracInconditionnelles);
      this.accumulateCaracteristiquesByAddition(this.caracDoubleHand, other.caracDoubleHand);
      this.accumulateCaracteristiquesByAddition(this.caracTrueDoubleHand, other.caracTrueDoubleHand);
      this.accumulateCaracteristiquesByAddition(this.caracTrueDualWield, other.caracTrueDualWield);
    }
    return this;
  }

  private accumulateCaracteristiquesByAddition(own: Caracteristiques, other: Caracteristiques) {
    if (FfbeUtils.isNullOrUndefined(own)) {
      own = other;
    } else {
      own.accumulateByAddition(other);
    }
  }

}
