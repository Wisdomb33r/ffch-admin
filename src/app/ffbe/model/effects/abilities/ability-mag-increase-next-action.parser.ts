import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';

export class AbilityMagIncreaseNextAction extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3
      || effect[0] !== 0 || effect[1] !== 3 || effect[3][2] !== 0) {
      return 'Effet AbilityMagIncreaseNextAction inconnu: Mauvaise liste de paramètres';
    }

    const magIncrease = effect[3][0];
    const magIncreaseMax = effect[3][1];
    const increaseMaxText = magIncreaseMax > magIncrease ? ` (cumulable, +${magIncreaseMax}% max)` : '';

    return `+${magIncrease}% MAG pour la prochaine action du lanceur${increaseMaxText}`;
  }
}
