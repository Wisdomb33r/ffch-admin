import {NameValuePairArray} from '../name-value-pair-array.model';

export class ObjetElements {
  public constructor(
    public feu: number,
    public glace: number,
    public foudre: number,
    public eau: number,
    public air: number,
    public terre: number,
    public lumiere: number,
    public tenebres: number
  ) {
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

  public static newEmptyObjetElements(): ObjetElements {
    return new ObjetElements(null, null, null, null, null, null, null, null);
  }

  public static produce(oe: ObjetElements): ObjetElements {
    return new ObjetElements(oe.feu, oe.glace, oe.foudre, oe.eau, oe.air, oe.terre, oe.lumiere, oe.tenebres);
  }

}
