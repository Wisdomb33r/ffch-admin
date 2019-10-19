import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesMagicSprScalingParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3 || effect[3][0] !== 100 || effect[3][1] < 9999) {
      return 'Effet AbilityDamagesMagicSprScalingParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    const attackType = this.getAttackAndDamageWordingForMagicalDamages(skill.attack_type);
    skill.magique = true;
    const puissance = effect[3][2];
    const target = this.getTarget(effect[0], effect[1]);
    return attackType + (elements ? 'de ' + elements + ' ' : 'neutres ')
      + 'calculé sur la PSY de puissance ' + Math.round(puissance) + '% ' + target;
  }
}
