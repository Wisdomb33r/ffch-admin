import {UniteMateriauEveil} from "./unite-materiau-eveil.model";

export class UniteMateriauxEveil {

  constructor(  public unite_numero : number,
  public materiaux : Array<UniteMateriauEveil>)
  {
  }

  public static produce(ume: UniteMateriauxEveil) : UniteMateriauxEveil
  {
    const materiaux = ume.materiaux.map(materiau => UniteMateriauEveil.produce(materiau));
    return new UniteMateriauxEveil(ume.unite_numero, materiaux);
  }

}
