import {isNullOrUndefined} from 'util';
import {ObjetCarac} from './objet-carac';
import {Competence} from '../competence.model';
import {FfbeUtils} from '../../utils/ffbe-utils';
import {CategorieObjet} from './categorie-objet.model';
import {ObjetElements} from './objet-elements';

export class Objet {

  public extended_gumi_id: string;
  public prix_vente: number;

  public elements: ObjetElements;

  constructor(
    public id: number,
    public categorie: CategorieObjet,
    public nom: string,
    public nom_en: string,
    public stars: number,
    public icone: string,
    public gumi_id: number,
    public description: string,
    public description_en: string,
    public effet: string,
    public effet_en: string,
    public carac: ObjetCarac,
    public caracp: ObjetCarac,
    public competences: Array<Competence>
  ) {
  }

  public static produce(o: Objet): Objet {
    const categorie = FfbeUtils.findObjetCategorieByFfchId(o.categorie.ffchId);
    return new Objet(
      o.id,
      categorie,
      o.nom,
      o.nom_en,
      o.stars,
      o.icone,
      o.gumi_id,
      o.description,
      o.description_en,
      o.effet,
      o.effet_en,
      ObjetCarac.produce(o.carac),
      ObjetCarac.produce(o.caracp),
      o.competences);
  }

  public isPresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.id);
  }

  public isImagePresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.icone);
  }
}
