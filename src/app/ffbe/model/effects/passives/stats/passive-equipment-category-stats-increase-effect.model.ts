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
    if (!Array.isArray(parameters) || parameters.length < 6) {
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
    return FfbeUtils.replaceLastOccurenceInString(this.wordEffectJoiningIdenticalValues(this.increases), ', ', ' et ')
      + ' si l\'unité porte ' + (EffectParser.isEquipmentCategoryFeminine(this.equipmentGumiId) ? 'une ' : 'un ')
      + EffectParser.getEquipmentCategoryTypeWithLink(this.equipmentGumiId);
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return `+${currentValue}% ${accumulatedStats.join('/')}`;
  }

  protected get effectName(): string {
    return 'PassiveEquipmentCategoryStatsIncreaseEffect';
  }

}


export class PassiveEquipmentCategoryStatsIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5) {
      return 'Effet PassiveEquipmentCategoryStatsIncreaseParser inconnu: Mauvaise liste de paramètres';
    }
    const equipmentGumiId = effect[3][0];
    const increases = [
      {name: 'PV', value: (effect[3][5] ? effect[3][5] : 0)},
      {name: 'PM', value: (effect[3][6] ? effect[3][6] : 0)},
      {name: 'ATT', value: effect[3][1]},
      {name: 'DÉF', value: effect[3][2]},
      {name: 'MAG', value: effect[3][3]},
      {name: 'PSY', value: effect[3][4]},
    ];
    // TODO critical strikes
    return FfbeUtils.replaceLastOccurenceInString(this.wordEffectJoiningIdenticalValues(increases), ', ', ' et ')
      + ' si l\'unité porte ' + (EffectParser.isEquipmentCategoryFeminine(equipmentGumiId) ? 'une ' : 'un ')
      + EffectParser.getEquipmentCategoryTypeWithLink(equipmentGumiId);
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return '+' + currentValue + '% ' + accumulatedStats.join('/');
  }
}
