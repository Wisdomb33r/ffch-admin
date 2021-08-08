import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {Skill} from '../../skill.model';
import {TargetPrepositionEnum} from '../target-preposition.enum';

export class AbilityAccuracyIncreaseEffect extends SkillEffect {

  private dispellable: boolean;
  private increase: number;
  private numTurns: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 5 || parameters[1] !== 0 || parameters[3] !== 1) {
      this.parameterError = true;
    } else {
      this.increase = parameters[0];
      this.numTurns = parameters[2];
      this.dispellable = parameters[4] !== 1;
    }
  }

  protected wordEffectImpl(skill: Skill) {
    const dispellableWording = this.dispellable ? ' (bonus non-dissipable)' : '';
    const increaseSign = this.increase >= 0 ? '+' : '';
    return `${increaseSign}${this.increase}% précision ${this.wordTarget(TargetPrepositionEnum.A)} ${this.wordForTurns(this.numTurns)}${dispellableWording}`;
  }

  protected get effectName(): string {
    return 'AbilityAccuracyIncreaseEffect';
  }
}
