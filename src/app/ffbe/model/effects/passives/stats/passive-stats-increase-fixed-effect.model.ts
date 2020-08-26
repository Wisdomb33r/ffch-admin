import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {Skill} from '../../../skill.model';

export class PassiveStatsIncreaseFixedEffect extends SkillEffect {

  protected increases: Array<{ name: string, value: number }>;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 6) {
      this.parameterError = true;
    } else {
      this.increases = [
        {name: 'PV', value: parameters[4]},
        {name: 'PM', value: parameters[5]},
        {name: 'ATT', value: parameters[0]},
        {name: 'DÉF', value: parameters[1]},
        {name: 'MAG', value: parameters[2]},
        {name: 'PSY', value: parameters[3]},
      ];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    return this.wordEffectJoiningIdenticalValues(this.increases);
  }

  protected get effectName(): string {
    return 'PassiveStatsIncreaseFixedEffect';
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return `+${currentValue} ${accumulatedStats.join('/')}`;
  }
}
