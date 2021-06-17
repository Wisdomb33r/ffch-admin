import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {FfbeUtils} from '../../../../utils/ffbe-utils';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {NameValuePairArray} from '../../../name-value-pair-array.model';

export class PassiveEquipmentCategoryStatsIncreaseEffect extends SkillEffect {

  private equipmentGumiId: number;
  private increases: NameValuePairArray;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 5) {
      this.parameterError = true;
    } else {
      this.equipmentGumiId = parameters[0];
      this.increases = [
        {name: 'PV', value: (parameters[5] ? parameters[5] : 0)},
        {name: 'PM', value: (parameters[6] ? parameters[6] : 0)},
        {name: 'ATT', value: parameters[1]},
        {name: 'DÉF', value: parameters[2]},
        {name: 'MAG', value: parameters[3]},
        {name: 'PSY', value: parameters[4]},
      ];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    // TODO critical strikes
    const increaseText = FfbeUtils.replaceLastOccurenceInString(this.wordEffectJoiningIdenticalValues(this.increases), ', ', ' et ');
    const determinant = (EffectParser.isEquipmentCategoryFeminine(this.equipmentGumiId) ? 'une' : 'un');
    const equipmentCategoryLink = EffectParser.getEquipmentCategoryTypeWithLink(this.equipmentGumiId);
    return `${increaseText} si l'unité porte ${determinant} ${equipmentCategoryLink}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return `+${currentValue}% ${accumulatedStats.join('/')}`;
  }

  protected get effectName(): string {
    return 'PassiveEquipmentCategoryStatsIncreaseEffect';
  }

}
