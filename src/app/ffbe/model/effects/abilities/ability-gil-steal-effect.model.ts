import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {Skill} from '../../skill.model';
import {TargetPrepositionEnum} from '../target-preposition.enum';

export class AbilityGilStealEffect extends SkillEffect {

  private minPercent: number;
  private maxPercent: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 2) {
      this.parameterError = true;
    } else {
      this.minPercent = parameters[0];
      this.maxPercent = parameters[1];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return `Vole ${this.minPercent}% à ${this.maxPercent}% des gils ${this.wordTarget(TargetPrepositionEnum.De)}`;
  }

  protected get effectName(): string {
    return 'AbilityGilStealEffect';
  }
}
