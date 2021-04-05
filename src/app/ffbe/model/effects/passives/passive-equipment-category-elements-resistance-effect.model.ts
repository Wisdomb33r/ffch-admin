import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {ResistancesElementaires} from '../../resistances-elementaires.model';

export class PassiveEquipmentCategoryElementsResistanceEffect extends SkillEffect {

  private increases: ResistancesElementaires;
  private equipmentGumiId: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 9) {
      this.parameterError = true;
    } else {
      this.equipmentGumiId = parameters[0];
      this.increases = new ResistancesElementaires(parameters[1], parameters[2], parameters[3],
        parameters[4], parameters[5], parameters[6], parameters[7], parameters[8]);
    }
  }

  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 9) {
      return 'Effet PassiveEquipmentCategoryStatsIncreaseParser inconnu: Mauvaise liste de paramètres';
    }
    const equipmentGumiId = effect[3][0];
    const increases = [
      {name: 'Feu', value: effect[3][1]},
      {name: 'Glace', value: effect[3][2]},
      {name: 'Foudre', value: effect[3][3]},
      {name: 'Eau', value: effect[3][4]},
      {name: 'Vent', value: effect[3][5]},
      {name: 'Terre', value: effect[3][6]},
      {name: 'Lumière', value: effect[3][7]},
      {name: 'Ténèbres', value: effect[3][8]},
    ];
    return this.wordEffectJoiningIdenticalValues(increases)
      + ' si l\'unité porte ' + (EffectParser.isEquipmentCategoryFeminine(equipmentGumiId) ? 'une ' : 'un ')
      + EffectParser.getEquipmentCategoryTypeWithLink(equipmentGumiId);
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    if (accumulatedStats.length === 8) {
      return '+' + currentValue + '% de rés. aux éléments';
    }
    return '+' + currentValue + '% de rés. ' + accumulatedStats.join(', ');
  }

  protected wordEffectImpl(skill: Skill): string {
    return this.wordEffectJoiningIdenticalValues(this.increases.toNameValuePairArray())
      + ' si l\'unité porte ' + (EffectParser.isEquipmentCategoryFeminine(this.equipmentGumiId) ? 'une ' : 'un ')
      + EffectParser.getEquipmentCategoryTypeWithLink(this.equipmentGumiId);
  }

  protected get effectName(): string {
    return 'PassiveEquipmentCategoryElementsResistanceEffect';
  }
}
