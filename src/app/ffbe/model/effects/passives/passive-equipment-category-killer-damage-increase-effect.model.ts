import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {FFBE_MONSTER_TYPES} from '../../../ffbe.constants';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';
import {SkillEffect} from '../skill-effect.model';
import {TargetNumberEnum} from '../target-number.enum';
import {TargetTypeEnum} from '../target-type.enum';

export class PassiveEquipmentCategoryKillerDamageIncreaseEffect extends SkillEffect {

  private equipmentGumiId: number;
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
      this.equipmentGumiId = parameters[0];
      this.monsterTypeGumiId = parameters[1];
      this.physicalDamageIncrease = parameters[2];
      this.magicalDamageIncrease = parameters[3];
    }
  }

  protected wordEffectImpl(skill: Skill): string {
    let text = '';
    const monsterType = FFBE_MONSTER_TYPES.find(type => type.gumiId === this.monsterTypeGumiId);
    const monsterTypeText = 'contre les ' + (monsterType ? monsterType.pluralName : 'UNKNOWN');
    if (this.physicalDamageIncrease > 0) {
      text += '+' + this.physicalDamageIncrease + '% de dégâts physiques ';
      if (this.magicalDamageIncrease > 0 && this.physicalDamageIncrease === this.magicalDamageIncrease) {
        text += 'et magiques ';
      }
      text += monsterTypeText;
    }
    if (this.magicalDamageIncrease > 0 && this.physicalDamageIncrease !== this.magicalDamageIncrease) {
      text += (text.length ? HTML_LINE_RETURN : '') + '+' + this.magicalDamageIncrease + '% de dégâts magiques ' + monsterTypeText;
    }

    return text + ' si l\'unité porte ' + (EffectParser.isEquipmentCategoryFeminine(this.equipmentGumiId) ? 'une ' : 'un ')
      + EffectParser.getEquipmentCategoryTypeWithLink(this.equipmentGumiId);
  }

  protected get effectName(): string {
    return 'PassiveEquipmentCategoryKillerDamageIncreaseEffect';
  }
}

export class PassiveEquipmentCategoryKillerDamageIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 4) {
      return 'Effet PassiveEquipmentCategoryKillerDamageIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const equipmentGumiId = effect[3][0];
    const monsterTypeGumiId = effect[3][1];
    const physicalDamageIncrease = effect[3][2];
    const magicalDamageIncrease = effect[3][3];

    let text = '';
    const monsterType = FFBE_MONSTER_TYPES.find(type => type.gumiId === monsterTypeGumiId);
    const monsterTypeText = 'contre les ' + (monsterType ? monsterType.pluralName : 'UNKNOWN');
    if (physicalDamageIncrease > 0) {
      text += '+' + physicalDamageIncrease + '% de dégâts physiques ';
      if (magicalDamageIncrease > 0 && physicalDamageIncrease === magicalDamageIncrease) {
        text += 'et magiques ';
      }
      text += monsterTypeText;
    }
    if (magicalDamageIncrease > 0 && physicalDamageIncrease !== magicalDamageIncrease) {
      text += (text.length ? HTML_LINE_RETURN : '') + '+' + magicalDamageIncrease + '% de dégâts magiques ' + monsterTypeText;
    }

    return text + ' si l\'unité porte ' + (EffectParser.isEquipmentCategoryFeminine(equipmentGumiId) ? 'une ' : 'un ')
      + EffectParser.getEquipmentCategoryTypeWithLink(equipmentGumiId);
  }
}
