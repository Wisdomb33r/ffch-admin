import {Ingredient} from './ingredient.model';

export class UniteMateriauxEveil {

  constructor(public unite_numero: number,
              public materiaux: Array<Ingredient>) {
  }

  public static produce(ume: UniteMateriauxEveil): UniteMateriauxEveil {
    const materiaux = ume.materiaux.map(ingredient => Ingredient.produce(ingredient));
    return new UniteMateriauxEveil(ume.unite_numero, materiaux);
  }
}
