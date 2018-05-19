import {Objet} from "./objet.model";
import {isNullOrUndefined} from "util";

export class UniteMateriauEveil {
  public materiau : Objet;

  constructor(public gumi_id: number,
              public quantite: number) {
  }

  public static produce(m: UniteMateriauEveil)
  {
    const  materiauEveil = new UniteMateriauEveil(m.gumi_id, m.quantite);
    materiauEveil.materiau = Objet.produce(m.materiau);
    return materiauEveil;
  }

  public isPresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.materiau) && this.materiau.isPresentInFfchDb();
  }

  public isImagePresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.materiau) && this.materiau.isImagePresentInFfchDb();
  }
}
