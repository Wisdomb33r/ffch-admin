import {Formule} from './formule.model';

export class UniteEveil {

  constructor(public unite_numero: number,
              public formule: Formule,
              public ajoute_obtention: boolean) {
  }

  public static produce(uniteEveil: UniteEveil): UniteEveil {
    const formule = Formule.produce(uniteEveil.formule);
    return new UniteEveil(uniteEveil.unite_numero, formule, uniteEveil.ajoute_obtention);
  }
}
