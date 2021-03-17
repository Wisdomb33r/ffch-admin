import {FfbeUtils} from '../utils/ffbe-utils';
import {NameValuePair, NameValuePairArray} from './name-value-pair-array.model'

export class Caracteristiques {
  public constructor(
    public pv: number = null,
    public pm: number = null,
    public att: number = null,
    public def: number = null,
    public mag: number = null,
    public psy: number = null
  ) {
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
    return entries.reduce((a, b) => a.accumulateByAddition(b), new Caracteristiques());
  }

  public toNameValuePairArray(): NameValuePairArray {
    return Array.of(
      new NameValuePair('PV', this.pv),
      new NameValuePair('PM', this.pm),
      new NameValuePair('ATT', this.att),
      new NameValuePair('DÉF', this.def),
      new NameValuePair('MAG', this.mag),
      new NameValuePair('PSY', this.psy)
    );
  }

  public isDifferent(other: Caracteristiques) {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return false;
    } else {
      return this.pv !== other.pv || this.pm !== other.pm ||
        this.att !== other.att || this.def !== other.def ||
        this.mag !== other.mag || this.psy !== other.psy;
    }
  }
}
