import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {Skill} from '../../../skill.model';
import {SkillEffect} from '../../skill-effect.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';

export class PassiveDualWieldWeaponCategoryUnlockEffect extends SkillEffect {

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 1) {
      this.parameterError = true;
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    if (this.parameters.length === 1 && this.parameters[0] === 'none') {
      return 'Permet d\'équiper deux armes';
    }

    return 'Permet d\'équiper deux ' + this.parameters.map(categorie => EffectParser.getEquipmentCategoryNameWithLink(categorie)).join(', ');
  }

  protected get effectName(): string {
    return 'PassiveDualWieldWeaponCategoryUnlockEffect';
  }
}
