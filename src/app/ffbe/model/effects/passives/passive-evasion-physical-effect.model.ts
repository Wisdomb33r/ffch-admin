import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveEvasionPhysicalEffect extends SkillEffect {

  private evadeChance: number;
  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.evadeChance = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return `+${this.evadeChance}% d'esquive physique`;
  }

  protected get effectName(): string {
    return 'PassiveEvasionPhysicalEffect';
  }
}
