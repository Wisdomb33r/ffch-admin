import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveMpDecreaseForSongsEffect extends SkillEffect {

  private mpCostDecrease: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.mpCostDecrease = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return `-${this.mpCostDecrease}% de PM consommés par les compétences chantées`;
  }

  protected get effectName(): string {
    return 'PassiveMpDecreaseForSongsEffect';
  }
}
