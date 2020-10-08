import {FfbeUtils} from '../utils/ffbe-utils';

export class Tueurs {
  constructor(
    public betes: number = null,
    public oiseaux: number = null,
    public aquatiques: number = null,
    public demons: number = null,
    public humains: number = null,
    public machines: number = null,
    public dragons: number = null,
    public esprits: number = null,
    public insectes: number = null,
    public pierres: number = null,
    public plantes: number = null,
    public mortsVivants: number = null
  ) {
  }

  public static computeSum(entries: Array<Tueurs>): Tueurs {
    return entries.reduce((a,b) => a.accumulateByAddition(b), new Tueurs());
  }

  public accumulateByAddition(other: Tueurs) {
    if (FfbeUtils.isNullOrUndefined(other)) {
      return this;
    }

    this.betes += other.betes;
    this.oiseaux += other.oiseaux;
    this.aquatiques += other.aquatiques;
    this.demons += other.demons;
    this.humains += other.humains;
    this.machines += other.machines;
    this.dragons += other.dragons;
    this.esprits += other.esprits;
    this.insectes += other.insectes;
    this.pierres += other.pierres;
    this.plantes += other.plantes;
    this.mortsVivants += other.mortsVivants;

    return this;
  }
}
