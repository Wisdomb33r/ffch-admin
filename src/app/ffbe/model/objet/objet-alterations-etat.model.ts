import {FfbeUtils} from '../../utils/ffbe-utils';

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

  public static produce(oae: ObjetAlterationsEtat): ObjetAlterationsEtat {
    if (FfbeUtils.isNullOrUndefined(oae)) {
      return this.newEmptyObjetAlterationsEtat();
    }
    return new ObjetAlterationsEtat(oae.poison, oae.cecite, oae.sommeil, oae.silence, oae.paralysie, oae.confusion, oae.maladie, oae.petrification);
  }

}
