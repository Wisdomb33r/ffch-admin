import {isNullOrUndefined} from 'util';

export class Objet {
  public id: number;
  public nom: string;
  public nom_en: string;
  public icone: string;
  public gumi_id: number;

  constructor(o: Objet) {
    this.id = o.id;
    this.nom = o.nom;
    this.nom_en = o.nom_en;
    this.icone = o.icone;
    this.gumi_id = o.gumi_id;
  }

  public isPresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.id);
  }

  public isImagePresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.icone);
  }
}
