export class Competence {
  constructor(public gumi_id: number,
              public categorie: number,
              public nom: string,
              public nom_en: string,
              public description: string,
              public description_en: string,
              public pm: number,
              public hits: number,
              public frames: string) {
  }
}
