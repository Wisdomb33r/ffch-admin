import {Skill} from '../../../skill.model';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class PassiveLbUpgradeEffect extends SkillEffect {

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters)) {
      this.parameterError = true;
    } else {
      if (parameters.length < 1) {
        this.parameterWarning = true;
      }
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return 'Améliore la limite de l\'unité';
  }

  protected get effectName(): string {
    return 'PassiveLbUpgradeEffect';
  }
}
