import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveEvasionMagicalEffect extends SkillEffect {

  private extraParameter: number;
  private evadeChance: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 2) {
      this.parameterError = true;
    } else {
      if (this.parameters[0] !== -1) {
        this.parameterWarning = true;
      }
      this.extraParameter = parameters[0];
      this.evadeChance = parameters[1];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const noCumulativeText: string = this.extraParameter === -1 ? ' (effet passif non cumulable)' : ' (UNKNOWN parameter)';

    return `+${this.evadeChance}% d'esquive magique${noCumulativeText}`;
  }

  protected get effectName(): string {
    return 'PassiveEvasionMagicalEffect';
  }
}
