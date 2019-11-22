import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDeathInflictionParser extends EffectParser {
  parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1 ||
      (effect[3].length >= 3 && effect[3][1] !== 1)) {
      return 'Effet AbilityDeathInflictionParser inconnu: Mauvaise liste de paramètres';
    }

    const ignoresDeathResistance = effect[3].length > 1 && effect[3][2] === 1;
    const resistanceMessage = ignoresDeathResistance ? ' (ignore la rés. à Mort)' : '';

    const target = this.getTarget(effect[0], effect[1]);
    const chance = effect[3][0];

    return `Inflige Mort (${chance}%) ${target}${resistanceMessage}`;
  }
}
