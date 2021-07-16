import {Type} from 'class-transformer';

export class Competence {
  public id: number;
  public enhanced: boolean;
  @Type(() => String)
  public elements: string;

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
              public rawEffects: string,
              public puissance: number,
              public pm: number,
              public lb: number,
              public ep: number,
              public hits: number,
              public frames: string,
              public damages: string,
              public parameterWarning: boolean) {
  }
}
