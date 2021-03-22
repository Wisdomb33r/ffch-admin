import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {Skill} from '../../../skill.model';

export class AbilitySkillTagTeamAttackActivationEffect extends SkillEffect {

  private skillId: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 6 || parameters[1] !== 1 || parameters[2] !== 1
      || parameters[3] !== 1 || parameters[4] !== 1) {
      this.parameterError = true;
    } else {
      this.skillId = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    if (this.skillId !== skill.gumi_id) {
      return this.wordBadParameterText();
    } else {
      return 'Active le combo duo pour cette attaque';
    }
  }

  protected get effectName(): string {
    return 'AbilitySkillTagTeamAttackActivationEffect';
  }
}
