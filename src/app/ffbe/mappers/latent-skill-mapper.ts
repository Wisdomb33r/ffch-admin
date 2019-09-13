import {LatentSkill} from '../model/latent-skill.model';
import {Amelioration} from '../model/amelioration.model';
import {Ingredient} from '../model/ingredient.model';
import {Formule} from '../model/formule.model';

export class LatentSkillMapper {

  public static toAmelioration(latentSkill: LatentSkill): Amelioration {

    const formule = this.createFormule(latentSkill.ep_cost);

    const amelioration = new Amelioration(
      latentSkill.gumi_id,
      latentSkill.units,
      null,
      null,
      null,
      null,
      latentSkill.skill_id_parent,
      latentSkill.skill_id,
      latentSkill.skill_id_base,
      formule,
      latentSkill.level);

    return amelioration;
  }

  protected static createFormule(ep_cost: number) {
    const ingredient = new Ingredient(1209001000, ep_cost);

    return new Formule([ingredient], 0);
  }

}
