import {Skill} from '../../skill.model';
import {FfbeUtils} from '../../../utils/ffbe-utils';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {SkillEffect} from '../skill-effect.model';
import {EffectParser} from '../../../mappers/effects/effect-parser';
import {NameValuePairArray} from '../../name-value-pair-array.model';

export class PassiveAilmentsResistanceEffect extends SkillEffect {

  private increases: NameValuePairArray;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 8) {
      this.parameterError = true;
    } else {
      this.increases = EffectParser.getKeyValueTableForAilements(parameters);
    }
  }

  protected get effectName(): string {
    return 'PassiveAilmentsResistanceEffect';
  }

  protected wordEffectImpl(skill: Skill): string {
    return this.wordEffectJoiningIdenticalValues(this.increases);
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    if (accumulatedStats.length === 8) {
      return '+' + currentValue + '% de rés. aux altérations';
    }
    return '+' + currentValue + '% de rés. ' + FfbeUtils.replaceLastOccurenceInString(accumulatedStats.join(', '), ', ', ' et ');
  }
}
