export class ObjetAlterationsEtat {
  public constructor(
    public poison: number,
    public cecite: number,
    public sommeil: number,
    public silence: number,
    public paralysie: number,
    public confusion: number,
    public maladie: number,
    public petrification: number
  ) {
  }

  public static newEmptyObjetAlterationsEtat(): ObjetAlterationsEtat {
    return new ObjetAlterationsEtat(null, null, null, null, null, null, null, null);
  }

  public static produce(oe: ObjetAlterationsEtat): ObjetAlterationsEtat {
    return new ObjetAlterationsEtat(oe.poison, oe.cecite, oe.sommeil, oe.silence, oe.paralysie, oe.confusion, oe.maladie, oe.petrification);
  }

}
