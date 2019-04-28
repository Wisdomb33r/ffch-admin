import {isNullOrUndefined} from 'util';
import {ObjetCarac} from './objet-carac';

export class Objet {

  public description: string;
  public description_en: string;

  public extended_gumi_id: string;
  public prix_vente: number;

  public carac: ObjetCarac;
  public caracp: ObjetCarac;

  constructor(
    public id: number,
    public nom: string,
    public nom_en: string,
    public icone: string,
    public gumi_id: number
  ) {
  }

  public static produce(o: Objet): Objet {
    return new Objet(o.id, o.nom, o.nom_en, o.icone, o.gumi_id);
  }

  public isPresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.id);
  }

  public isImagePresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.icone);
  }
}
