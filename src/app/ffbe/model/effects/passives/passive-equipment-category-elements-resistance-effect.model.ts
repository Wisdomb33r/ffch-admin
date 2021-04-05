import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';
import {ResistancesElementaires} from '../../resistances-elementaires.model';

export class PassiveEquipmentCategoryElementsResistanceEffect extends SkillEffect {

  private increases: ResistancesElementaires;
  private equipmentGumiIds: Array<number>;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 9) {
      this.parameterError = true;
    } else {
      this.equipmentGumiIds = Array.isArray(parameters[0]) ? parameters[0] : [parameters[0]];
      this.increases = new ResistancesElementaires(parameters[1], parameters[2], parameters[3],
        parameters[4], parameters[5], parameters[6], parameters[7], parameters[8]);
    }
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    if (accumulatedStats.length === 8) {
      return '+' + currentValue + '% de rés. aux éléments';
    }
    return '+' + currentValue + '% de rés. ' + accumulatedStats.join(', ');
  }

  protected wordEffectImpl(skill: Skill): string {
    const equipmentLinks = this.equipmentGumiIds.map(equipmentGumiId => {
      return (EffectParser.isEquipmentCategoryFeminine(equipmentGumiId) ? 'une ' : 'un ')
      + EffectParser.getEquipmentCategoryTypeWithLink(equipmentGumiId);
    });

    const equipmentLinksText = equipmentLinks.length === 1 ? equipmentLinks :
      `${equipmentLinks.slice(0, equipmentLinks.length - 1).join(', ')} ou ${equipmentLinks[equipmentLinks.length - 1]}`;

    return `${this.wordEffectJoiningIdenticalValues(this.increases.toNameValuePairArray())} si l'unité porte ${equipmentLinksText}`;
  }

  protected get effectName(): string {
    return 'PassiveEquipmentCategoryElementsResistanceEffect';
  }
}
