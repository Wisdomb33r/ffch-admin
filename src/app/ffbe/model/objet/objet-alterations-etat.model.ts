import {FfbeUtils} from '../../utils/ffbe-utils';

export class ResistancesAlterations {
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

  public static newEmptyObjetAlterationsEtat(): ResistancesAlterations {
    return new ResistancesAlterations(null, null, null, null, null, null, null, null);
  }

  public static produce(oae: ResistancesAlterations): ResistancesAlterations {
    if (FfbeUtils.isNullOrUndefined(oae)) {
      return this.newEmptyObjetAlterationsEtat();
    }
    return new ResistancesAlterations(oae.poison, oae.cecite, oae.sommeil, oae.silence, oae.paralysie, oae.confusion, oae.maladie, oae.petrification);
  }

}
