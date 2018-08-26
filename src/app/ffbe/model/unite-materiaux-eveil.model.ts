import {Formule} from './formule.model';

export class UniteMateriauxEveil {

  constructor(public unite_numero: number,
              public formule: Formule) {
  }

  public static produce(ume: UniteMateriauxEveil): UniteMateriauxEveil {
    const formule = Formule.produce(ume.formule);
    return new UniteMateriauxEveil(ume.unite_numero, formule);
  }
}
