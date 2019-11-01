import {ObjetCarac} from './objet-carac';
import {Competence} from '../competence.model';
import {FfbeUtils} from '../../utils/ffbe-utils';
import {CategorieObjet} from './categorie-objet.model';
import {ObjetElements} from './objet-elements';
import {ObjetAlterationsEtat} from './objet-alterations-etat.model';
import {ObjetLienTMR} from './objet-lien-tmr.model';

export class Objet {

  public extended_gumi_id: string;
  public prix_vente: number;
  public resistancesElementaires: ObjetElements;
  public elementsArme: ObjetElements;
  public alterationsArme;
  public two_handed;
  public variance_min: number;
  public variance_max: number;

  public lienTMR: ObjetLienTMR;

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
    public elements: ObjetElements,
    public resistancesAlterations: ObjetAlterationsEtat,
    public competences: Array<Competence>
  ) {
  }

  public static produce(o: Objet): Objet {
    const categorie = FfbeUtils.findObjetCategorieByFfchId(o.categorie.ffchId);
    const objet = new Objet(
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
      ObjetElements.produce(o.elements),
      ObjetAlterationsEtat.produce(o.resistancesAlterations),
      o.competences);
    objet.two_handed = o.two_handed;
    if (objet.isWeapon() && FfbeUtils.isNullOrUndefined(objet.two_handed)) {
      objet.two_handed = false;
    }
    objet.variance_min = o.variance_min;
    objet.variance_max = o.variance_max;
    objet.lienTMR = ObjetLienTMR.produce(o.lienTMR);
    return objet;
  }

  public isPresentInFfchDb(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.id);
  }

  public isImagePresentInFfchDb(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.icone);
  }

  public hasVariance(): boolean {
    return !FfbeUtils.isNullOrUndefined(this.variance_min) && !FfbeUtils.isNullOrUndefined(this.variance_max);
  }

  public isWeapon(): boolean {
    return (!FfbeUtils.isNullOrUndefined(this.categorie) && this.categorie.gumiId > 0 && this.categorie.gumiId <= 16);
  }
}
