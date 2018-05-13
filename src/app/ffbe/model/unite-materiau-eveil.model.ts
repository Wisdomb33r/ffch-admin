import {Objet} from "./objet.model";
import {isNullOrUndefined} from "util";

export class UniteMateriauEveil {
  public materiau : Objet;

  constructor(public gumi_id: number,
              public quantite: number) {
  }

  public isPresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.materiau) && this.materiau.isPresentInFfchDb();
  }

  public isImagePresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.materiau) && this.materiau.isImagePresentInFfchDb();
  }
}
