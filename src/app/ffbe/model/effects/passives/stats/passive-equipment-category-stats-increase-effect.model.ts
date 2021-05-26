import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {FfbeUtils} from '../../../../utils/ffbe-utils';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class PassiveEquipmentCategoryStatsIncreaseEffect extends SkillEffect {

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 6) {
      this.parameterError = true;
    } else {
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return '';
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
