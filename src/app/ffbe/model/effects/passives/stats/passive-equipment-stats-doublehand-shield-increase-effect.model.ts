import {Skill} from '../../../skill.model';
import {TargetNumberEnum} from '../../target-number.enum';
import {TargetTypeEnum} from '../../target-type.enum';
import {SkillEffect} from '../../skill-effect.model';
import {EffectParser} from '../../../../mappers/effects/effect-parser';
import {FfbeUtils} from '../../../../utils/ffbe-utils';

export class PassiveEquipmentStatsDoublehandShieldIncreaseEffect extends SkillEffect {

  private readonly stat: number;
  private readonly increase: number;
  private readonly weaponRestriction: Array<number>;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);

    if (!Array.isArray(parameters) || parameters.length < 3 || parameters[0] > 4) {
      this.parameterError = true;
    } else {
      this.stat = parameters[0];
      this.increase = parameters[1];
      this.weaponRestriction = Array.isArray(parameters[2]) ? parameters[2] : [parameters[2]];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    const statText = EffectParser.getStatNameFromId(this.stat);
    let restrictionText = this.weaponRestriction?.length === 16 ? '' :
      ' de type ' + this.weaponRestriction.map(category => EffectParser.getEquipmentCategoryTypeWithLink(category)).join(', ');
    restrictionText = FfbeUtils.replaceLastOccurenceInString(restrictionText, ', ', ' ou ');
    return `+${this.increase}% ${statText} de l'équipement si l'unité porte une seule arme${restrictionText} avec ou sans bouclier`;
  }

  protected get effectName(): string {
    return 'PassiveEquipmentStatsDoublehandShieldIncreaseEffect';
  }
}
