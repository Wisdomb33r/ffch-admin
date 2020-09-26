import {NameValuePairArray} from '../name-value-pair-array.model';
import {FfbeUtils} from '../../utils/ffbe-utils';

export class ObjetElements {
  public constructor(
    public feu: number = null,
    public glace: number = null,
    public foudre: number = null,
    public eau: number = null,
    public air: number = null,
    public terre: number = null,
    public lumiere: number = null,
    public tenebres: number = null
  ) {
  }

  public static produce(oe: ObjetElements): ObjetElements {
    return new ObjetElements(oe.feu, oe.glace, oe.foudre, oe.eau, oe.air, oe.terre, oe.lumiere, oe.tenebres);
  }


  public static computeSum(entries: Array<ObjetElements>): ObjetElements {
    return entries.reduce((a, b) => a.accumulateByAddition(b), new ObjetElements());
  }

  public accumulateByAddition(other: ObjetElements): ObjetElements {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return this;
    }

    this.feu += other.feu;
    this.glace += other.glace;
    this.foudre += other.foudre;
    this.eau += other.eau;
    this.air += other.air;
    this.terre += other.terre;
    this.lumiere += other.lumiere;
    this.tenebres += other.tenebres;
    return this;
  }

  public toNameValuePairArray(): NameValuePairArray {
    return [
      {name: 'Feu', value: this.feu},
      {name: 'Glace', value: this.glace},
      {name: 'Foudre', value: this.foudre},
      {name: 'Eau', value: this.eau},
      {name: 'Vent', value: this.air},
      {name: 'Terre', value: this.terre},
      {name: 'Lumière', value: this.lumiere},
      {name: 'Ténèbres', value: this.tenebres},
    ];
  }

}
