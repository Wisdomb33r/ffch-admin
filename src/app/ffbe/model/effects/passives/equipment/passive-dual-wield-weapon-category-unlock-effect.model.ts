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
    } else {

    }
  }

  protected wordEffectImpl(skill: Skill): string {
    return '';
  }

  protected get effectName(): string {
    return 'PassiveDualWieldWeaponCategoryUnlockEffect';
  }
}

export class PassiveDualWieldWeaponCategoryUnlockParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveDualWieldWeaponCategoryUnlockParser inconnu: Mauvaise liste de paramètres';
    }

    if (effect[3].length === 1 && effect[3][0] === 'none') {
      return 'Permet d\'équiper deux armes';
    }

    return 'Permet d\'équiper deux ' + effect[3].map(categorie => this.getEquipmentCategoryNameWithLink(categorie)).join(', ');
  }
}
