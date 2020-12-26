import {Skill} from '../../../skill.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {SkillEffect} from '../../skill-effect.model';

export class AbilitySkillMagnusGlexEffect extends SkillEffect {

  private activationLimit: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 6 || parameters[1] !== 2 ||
      parameters[4] !== 1 || parameters[5] !== 0 || (parameters[2] !== parameters[3])) {
      this.parameterError = true;
    } else {
      this.activationLimit = parameters[2];
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const pluralSuffix = this.activationLimit > 1 ? 's' : '';
    return `<strong>${this.activationLimit} utilisation${pluralSuffix} par combat</strong>:`;
  }

  protected get effectName(): string {
    return 'AbilitySkillMagnusGlexEffect';
  }
}
