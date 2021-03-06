import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {NameValuePairArray} from '../../../name-value-pair-array.model';

export class PassiveEquipmentWeaponElementStatsIncreaseEffect extends SkillEffect {

  private elementGumiId: number;
  private increases: NameValuePairArray;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 7) {
      this.parameterError = true;
    } else {
      this.elementGumiId = parameters[0];

      this.increases = [
        {name: 'PV', value: parameters[1]},
        {name: 'PM', value: parameters[2]},
        {name: 'ATT', value: parameters[3]},
        {name: 'DÉF', value: parameters[4]},
        {name: 'MAG', value: parameters[5]},
        {name: 'PSY', value: parameters[6]},
      ];

    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const increaseText = this.wordEffectJoiningIdenticalValues(this.increases);
    const elementText = EffectParser.getElementFromId(this.elementGumiId);
    return `${increaseText} si l'unité porte une arme d'élément ${elementText}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return `+${currentValue}% ${accumulatedStats.join('/')}`;
  }

  protected get effectName(): string {
    return 'PassiveEquipmentWeaponElementStatsIncreaseEffect';
  }
}
