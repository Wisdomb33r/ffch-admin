import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {Equipment} from '../../../items/equipment/equipment.model';
import {EquipmentsService} from '../../../../services/equipments.service';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {Caracteristiques} from '../../../caracteristiques.model';

export class PassiveEquipmentStatsIncreaseEffect extends SkillEffect {

  private readonly equipmentGumiIds: Array<number>;
  private readonly increasesCarac: Caracteristiques;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 8 ||
      (Number.isInteger(parameters[0]) && Array.isArray(parameters[0]))) {
      this.parameterError = true;
    } else {
      this.equipmentGumiIds = Array.isArray(parameters[0]) ? parameters[0] : [parameters[0]];
      this.increasesCarac = new Caracteristiques(
        parameters[5],
        parameters[6],
        parameters[1],
        parameters[2],
        parameters[3],
        parameters[4]
      )
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    // TODO critical strikes
    const equipment: Equipment = EquipmentsService.getInstance().searchForEquipmentByGumiId(this.equipmentGumiIds[0]);
    return this.wordEffectJoiningIdenticalValues(this.increasesCarac.toNameValuePairArray())
      + ' si l\'unité porte ' + this.getEquipmentNameWithGumiIdentifierLink(equipment);
    return '';
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return '+' + currentValue + '% ' + accumulatedStats.join('/');
  }

  protected get effectName(): string {
    return 'PassiveEquipmentStatsIncreaseEffect';
  }
}
