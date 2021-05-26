import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveEquipmentCategoryUnlockEffect extends SkillEffect {

  private equipmentCategory: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    } else {
      this.equipmentCategory = parameters[0];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return 'Permet d\'équiper les ' + EffectParser.getEquipmentCategoryNameWithLink(this.equipmentCategory);
  }

  protected get effectName(): string {
    return 'export class PassiveEquipmentCategoryUnlockEffect extends SkillEffect {\n';
  }

}
