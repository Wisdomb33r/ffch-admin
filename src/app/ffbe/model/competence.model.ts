export class Competence {
  public id: number;
  public physique: string;
  public magique: string;
  public hybride: string;
  public enhanced: string;
  public enhancedTicked: boolean;

  constructor(public gumi_id: number,
              public categorie: number,
              public icone: number,
              public nom: string,
              public nom_en: string,
              public description: string,
              public description_en: string,
              public effet: string,
              public effet_en: string,
              public puissance: number,
              public pm: number,
              public hits: number,
              public frames: string,
              public damages: string) {
  }
}
