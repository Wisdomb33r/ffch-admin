import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {Skill} from '../../skill.model';

export class AbilityTemporaryRemovalFromFightEffect extends SkillEffect {

  private minTurns: number;
  private maxTurns: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length !== 2) {
      this.parameterError = true;
    } else {
      this.minTurns = parameters[0];
      this.maxTurns = parameters[1];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const maxTurnsText = this.minTurns === this.maxTurns ? '' : ` à ${this.maxTurns}`;
    const turnsText = this.minTurns > 1 ? ' tours' : ' tour';
    return `Retire le lanceur du combat pour ${this.minTurns}${maxTurnsText}${turnsText}`;
  }

  protected get effectName(): string {
    return 'AbilityTemporaryRemovalFromFightEffect';
  }
}
