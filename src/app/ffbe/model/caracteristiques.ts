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

}
