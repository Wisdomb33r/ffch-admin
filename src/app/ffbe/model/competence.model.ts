import {FfbeUtils} from '../utils/ffbe-utils';

export class Competence {
  public id: number;
  public enhanced: boolean;

  constructor(public gumi_id: number,
              public gumi_id_lie: number,
              public categorie: number,
              public physique: boolean,
              public magique: boolean,
              public hybride: boolean,
              public fixe: boolean,
              public esper: boolean,
              public icone: number,
              public nom: string,
              public nom_en: string,
              public description: string,
              public description_en: string,
              public effet: string,
              public effet_en: string,
              public effet_fr: string,
              public puissance: number,
              public pm: number,
              public lb: number,
              public ep: number,
              public hits: number,
              public frames: string,
              public damages: string,
              public elements: string,
              public parameterWarning: boolean) {
  }

  public static produce(competence: Competence): Competence {
    const copy = new Competence(
      competence.gumi_id,
      competence.gumi_id_lie,
      competence.categorie,
      competence.physique,
      competence.magique,
      competence.hybride,
      competence.fixe,
      competence.esper,
      competence.icone,
      competence.nom,
      competence.nom_en,
      competence.description,
      competence.description_en,
      competence.effet,
      competence.effet_en,
      competence.effet_fr,
      competence.puissance,
      competence.pm,
      competence.lb,
      competence.ep,
      competence.hits,
      competence.frames,
      competence.damages,
      FfbeUtils.isNullOrUndefined(competence.elements) || competence.elements === 'null' ? null : `${competence.elements}`,
      competence.parameterWarning);

    copy.id = competence.id;
    copy.enhanced = competence.enhanced;

    return copy;
  }
}
