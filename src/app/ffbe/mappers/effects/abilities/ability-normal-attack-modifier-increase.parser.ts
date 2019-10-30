import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityNormalAttackModifierIncreaseParser extends EffectParser {
  parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3 || effect[1] !== 3) {
      return 'Effet AbilityNormalAttackModifierIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const minMod = effect[3][0];
    const maxMod = effect[3][1];
    const dmgMultiplier = effect[3][2];
    let dmgText = '';
    if (dmgMultiplier > 0) {
      dmgText = ` (+${dmgMultiplier}% de dégâts encaissés par le lanceur durant l'effet)`;
    }

    return `+${minMod}% de puissance (cumulable, max +${maxMod}%) à la prochaine attaque normale du lanceur${dmgText}`;
  }
}
