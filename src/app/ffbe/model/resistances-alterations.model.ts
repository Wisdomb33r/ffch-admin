import {FfbeUtils} from '../utils/ffbe-utils';
import {NameValuePairArray} from './name-value-pair-array.model';

export class ResistancesAlterations {
  public constructor(
    public poison: number = null,
    public cecite: number = null,
    public sommeil: number = null,
    public silence: number = null,
    public paralysie: number = null,
    public confusion: number = null,
    public maladie: number = null,
    public petrification: number = null
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

  public static computeSum(entries: Array<ResistancesAlterations>) {
    return entries.reduce((a, b) => a.accumulateByAddition(b), new ResistancesAlterations());
  }

  public accumulateByAddition(other: ResistancesAlterations) {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return this;
    }

    this.poison += other.poison;
    this.cecite += other.cecite;
    this.sommeil += other.sommeil;
    this.silence += other.silence;
    this.paralysie += other.paralysie;
    this.confusion += other.confusion;
    this.maladie += other.maladie;
    this.petrification += other.petrification;
    return this;
  }

  public toNameValuePairArray(): NameValuePairArray {
    return [
      {name: 'Poison', value: this.poison},
      {name: 'Cecité', value: this.cecite},
      {name: 'Sommeil', value: this.sommeil},
      {name: 'Silence', value: this.silence},
      {name: 'Paralysie', value: this.paralysie},
      {name: 'Confusion', value: this.confusion},
      {name: 'Maladie', value: this.maladie},
      {name: 'Pétrification', value: this.petrification},
    ];
  }
}
