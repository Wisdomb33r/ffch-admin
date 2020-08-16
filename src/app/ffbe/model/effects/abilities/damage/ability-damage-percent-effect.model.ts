import {Skill} from '../../../skill.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {SkillEffect} from '../../skill-effect.model';

export class AbilityDamagePercentEffect extends SkillEffect {

  private percent: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 3 || parameters[2] !== 100 || parameters[0] !== parameters[1]) {
      this.parameterError = true;
    } else {
      this.percent = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const target = this.wordTarget();
    return `Retire ${this.percent}% des PV ${target}`;
  }

  protected get effectName(): string {
    return 'AbilityDamagePercentEffect';
  }

}
