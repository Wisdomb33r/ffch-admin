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

  public static newEmptyObjetElements(): ObjetElements {
    return new ObjetElements(null, null, null, null, null, null, null, null);
  }

  public static produce(oe: ObjetElements): ObjetElements {
    return new ObjetElements(oe.feu, oe.glace, oe.foudre, oe.eau, oe.air, oe.terre, oe.lumiere, oe.tenebres);
  }

}
