export class Amelioration {
  constructor(
    public gumi_id: number,
    public units: Array<number>,
    public nom: string,
    public nom_en: string,
    public description: string,
    public description_en: string,
    public skill_id_old: number,
    public skill_id_new: number,
    public skill_id_base: number,
    public level: number
  ) {
  }
}
