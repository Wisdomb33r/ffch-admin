import {isNullOrUndefined} from 'util';
export class Competence {
  public id: number;

  constructor(public gumi_id: number,
              public categorie: number,
              public nom: string,
              public nom_en: string,
              public description: string,
              public description_en: string,
              public effet: string,
              public effet_en: string,
              public puissance: number,
              public pm: number,
              public hits: number,
              public frames: string) {
  }

  public isPresentInFfchDb(): boolean {
    return !isNullOrUndefined(this.id);
  }
}
