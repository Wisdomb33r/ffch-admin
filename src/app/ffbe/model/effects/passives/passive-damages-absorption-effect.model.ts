import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveDamagesAbsorptionEffect extends SkillEffect {

  private absorptionPercent: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      if (parameters.length > 1 && [0, 1].indexOf(parameters[1]) === -1) {
        this.parameterWarning = true;
      }
      this.absorptionPercent = parameters[0];
    }
  }

  protected get effectName(): string {
    return 'PassiveDamagesAbsorptionEffect';
  }

  protected wordEffectImpl(skill: Skill): string {
    return `Absorbe ${this.absorptionPercent}% des dégâts physiques infligés (au max tous les PV de l\'adversaire)}`;
  }
}
