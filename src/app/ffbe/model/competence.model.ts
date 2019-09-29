export class Competence {
  public id: number;
  public physique: string;
  public magique: string;
  public hybride: string;
  public enhanced: boolean;

  constructor(public gumi_id: number,
              public categorie: number,
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
              public damages: string) {
  }

  public static produce(competence: Competence): Competence {
    const copy = new Competence(
      competence.gumi_id,
      competence.categorie,
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
      competence.damages);

    copy.id = competence.id;
    copy.physique = competence.physique;
    copy.magique = competence.magique;
    copy.hybride = competence.hybride;
    copy.enhanced = competence.enhanced;

    return copy;
  }
}
