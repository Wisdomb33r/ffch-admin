import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class AbilityMagIncreaseNextActionEffect extends SkillEffect {

  private magIncrease: number;
  private magIncreaseMax: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 3
      || targetNumber !== 0 || targetType !== 3 || parameters[2] !== 0) {
      this.parameterError = true;
    } else {
      this.magIncrease = parameters[0];
      this.magIncreaseMax = parameters[1];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const increaseMaxText = this.magIncreaseMax > this.magIncrease ? ` (cumulable, +${this.magIncreaseMax}% max)` : '';

    return `+${this.magIncrease}% MAG pour la prochaine action du lanceur${increaseMaxText}`;
  }

  protected get effectName(): string {
    return 'AbilityMagIncreaseNextActionEffect';
  }
}

export class AbilityMagIncreaseNextAction extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3
      || effect[0] !== 0 || effect[1] !== 3 || effect[3][2] !== 0) {
      return 'Effet AbilityMagIncreaseNextAction inconnu: Mauvaise liste de paramètres';
    }

    const magIncrease = effect[3][0];
    const magIncreaseMax = effect[3][1];
    const increaseMaxText = magIncreaseMax > magIncrease ? ` (cumulable, +${magIncreaseMax}% max)` : '';

    return `+${magIncrease}% MAG pour la prochaine action du lanceur${increaseMaxText}`;
  }
}
