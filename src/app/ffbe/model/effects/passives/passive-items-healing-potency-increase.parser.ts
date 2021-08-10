import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveItemsHealingPotencyIncreaseEffect extends SkillEffect {

  private potencyIncrease: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.potencyIncrease = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const potencyText = this.potencyIncrease > 0 ? this.potencyIncrease : 'UNKNOWN';
    return `+${potencyText}% d'efficacité des objets de soin en combat`;
  }

  protected get effectName(): string {
    return 'PassiveItemsHealingPotencyIncreaseEffect';
  }
}
