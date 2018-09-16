import {Formule} from './formule.model';

export class Amelioration {
  public perso_gumi_id: number;
  public released: boolean;

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
    public formule: Formule,
    public niveau: number
  ) {
  }

  public static produce(amelioration: Amelioration): Amelioration {
    const formule = Formule.produce(amelioration.formule);
    const producedAmelioration = new Amelioration(
      amelioration.gumi_id,
      amelioration.units,
      amelioration.nom,
      amelioration.nom_en,
      amelioration.description,
      amelioration.description_en,
      amelioration.skill_id_old,
      amelioration.skill_id_new,
      amelioration.skill_id_base,
      formule,
      amelioration.niveau
    );
    producedAmelioration.perso_gumi_id = amelioration.perso_gumi_id;
    producedAmelioration.released = amelioration.released;
    return producedAmelioration;
  }
}
