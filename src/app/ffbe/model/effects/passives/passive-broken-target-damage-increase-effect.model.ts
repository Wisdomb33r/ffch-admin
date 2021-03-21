import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {SkillEffect} from '../skill-effect.model';
import {Skill} from '../../skill.model';

export class PassiveBrokenTargetDamageIncreaseEffect extends SkillEffect {

  private damageType: number;
  private damageIncrease: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 2) {
      this.parameterError = true;
    } else {
      this.damageType = parameters[0];
      this.damageIncrease = parameters[1];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const damageTypeText = this.damageType === 2 ? 'magiques' : 'physiques';
    return `+${this.damageIncrease}% de dégâts ${damageTypeText} sur les cibles en état de choc`;
  }

  protected get effectName(): string {
    return 'PassiveBrokenTargetDamageIncreaseEffect';
  }
}
