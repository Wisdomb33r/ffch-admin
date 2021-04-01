import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityDeathInflictionEffect extends SkillEffect {

  private deathChance: number;
  private isIgnoringDeathResist: boolean;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.deathChance = parameters[0];
      this.isIgnoringDeathResist = parameters.length > 1 && parameters[2] === 1;
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const deathResistText = this.isIgnoringDeathResist ? ' (ignore la rés. à Mort)' : '';
    return `Inflige Mort (${this.deathChance}%) ${this.wordTarget()}${deathResistText}`;
  }

  protected get effectName(): string {
    return 'AbilityDeathInflictionEffect';
  }
}
