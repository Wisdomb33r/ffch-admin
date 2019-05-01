export class ObjetCarac {
  public constructor(
    public pv: number,
    public pm: number,
    public att: number,
    public def: number,
    public mag: number,
    public psy: number
  ) {
  }

  public static newEmptyObjetCarac(): ObjetCarac {
    return new ObjetCarac(null, null, null, null, null, null);
  }

  public static produce(oc: ObjetCarac): ObjetCarac {
    return new ObjetCarac(oc.pv, oc.pm, oc.att, oc.def, oc.mag, oc.psy);
  }

}
