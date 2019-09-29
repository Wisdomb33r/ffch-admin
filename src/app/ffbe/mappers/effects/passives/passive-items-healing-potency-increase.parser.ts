import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveItemsHealingPotencyIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveItemsHealingPotencyIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const potencyIncrease = effect[3][0];
    return '+' + (potencyIncrease > 0 ? potencyIncrease : 'UNKNOWN') + '% d\'efficacité des objets de soin en combat';
  }
}
