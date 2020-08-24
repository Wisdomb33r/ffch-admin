import {FfbeUtils} from '../utils/ffbe-utils';

export class Caracteristiques {
  public constructor(
    public pv: number,
    public pm: number,
    public att: number,
    public def: number,
    public mag: number,
    public psy: number
  ) {
  }

  public static newEmptyCaracteristiques(): Caracteristiques {
    return new Caracteristiques(null, null, null, null, null, null);
  }

  public static produce(oc: Caracteristiques): Caracteristiques {
    return new Caracteristiques(oc.pv, oc.pm, oc.att, oc.def, oc.mag, oc.psy);
  }

  public accumulateByAddition(other: Caracteristiques): Caracteristiques {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return this;
    }

    this.pv += other.pv;
    this.pm += other.pm;
    this.att += other.att;
    this.def += other.def;
    this.mag += other.mag;
    this.psy += other.psy;
    return this;
  }

  public static computeSum(entries: Array<Caracteristiques>): Caracteristiques {
    return entries.reduce((a, b) => a.accumulateByAddition(b), Caracteristiques.newEmptyCaracteristiques());
  }
}
