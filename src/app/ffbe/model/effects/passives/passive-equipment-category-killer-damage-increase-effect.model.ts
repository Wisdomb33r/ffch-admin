import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {FFBE_MONSTER_TYPES} from '../../../ffbe.constants';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveEquipmentCategoryKillerDamageIncreaseEffect extends SkillEffect {

  private equipmentGumiIds: Array<number>;
  private monsterTypeGumiId: number;
  private physicalDamageIncrease: number;
  private magicalDamageIncrease: number;

  constructor(protected targetNumber: TargetNumberEnum,
              protected targetType: TargetTypeEnum,
              protected effectId: number,
              protected parameters: Array<any>) {
    super(targetNumber, targetType, effectId);
    if (!Array.isArray(parameters) || parameters.length < 4) {
      this.parameterError = true;
    } else {
      this.equipmentGumiIds = Array.isArray(parameters[0]) ? parameters[0] : [parameters[0]];
      this.monsterTypeGumiId = parameters[1];
      this.physicalDamageIncrease = parameters[2];
      this.magicalDamageIncrease = parameters[3];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    let text = '';
    const monsterType = FFBE_MONSTER_TYPES.find(type => type.gumiId === this.monsterTypeGumiId);
    const monsterTypeText = `contre les ${(monsterType ? monsterType.pluralName : 'UNKNOWN')}`;
    if (this.physicalDamageIncrease > 0) {
      text += `+${this.physicalDamageIncrease}% de dégâts physiques `;
      if (this.magicalDamageIncrease > 0 && this.physicalDamageIncrease === this.magicalDamageIncrease) {
        text += 'et magiques ';
      }
      text += monsterTypeText;
    }
    if (this.magicalDamageIncrease > 0 && this.physicalDamageIncrease !== this.magicalDamageIncrease) {
      text += `${(text.length ? HTML_LINE_RETURN : '')} this.magicalDamageIncrease % de dégâts magiques ${monsterTypeText}`;
    }

    const equipmentLinks = this.equipmentGumiIds.map(equipmentGumiId =>
      `${EffectParser.isEquipmentCategoryFeminine(equipmentGumiId) ? 'une' : 'un'} ${EffectParser.getEquipmentCategoryTypeWithLink(equipmentGumiId)}`);

    const equipmentLinksText = equipmentLinks.length === 1 ? equipmentLinks :
      `${equipmentLinks.slice(0, equipmentLinks.length - 1).join(', ')} ou ${equipmentLinks[equipmentLinks.length - 1]}`;

    return text + ` si l'unité porte ${equipmentLinksText}`;
  }

  protected get effectName(): string {
    return 'PassiveEquipmentCategoryKillerDamageIncreaseEffect';
  }
}
