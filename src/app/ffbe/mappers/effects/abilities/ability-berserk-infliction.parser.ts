import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityBerserkInflictionParser extends EffectParser {
  parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilityBerserkInflictionParser inconnu: Mauvaise liste de paramètres';
    }

    const target = this.getTarget(effect[0], effect[1]);

    const numTurns = effect[3][0] >= 0 ? effect[3][0] : 9999;
    const pluralForm = numTurns > 1 ? 's' : '';

    const atkBoost = effect[3][1];
    const boostSign = atkBoost >= 0 ? '+' : '';

    return `Inflige Berserk (${boostSign}${atkBoost}% ATT) ${target} pour ${numTurns} tour${pluralForm}`;
  }
};
