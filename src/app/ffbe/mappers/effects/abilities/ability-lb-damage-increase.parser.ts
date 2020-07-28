import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {TargetPrepositionEnum} from '../../../model/effects/target-preposition.enum';

export class AbilityLbDamageIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilityLbDamageIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const damage = effect[3][0];
    const numTurns = effect[3][1];
    const target = this.getTarget(effect[0], effect[1], TargetPrepositionEnum.De);
    const pluralForm = numTurns > 1 ? 's' : '';

    let dispellable = '';
    if (effect[3].length >= 4 && effect[3][3] === 0) {
      dispellable = ' (bonus non-dissipable)';
    }

    return `+${damage}% aux dégâts de la limite ${target} pour ${numTurns} tour${pluralForm}${dispellable}`;
  }
}
