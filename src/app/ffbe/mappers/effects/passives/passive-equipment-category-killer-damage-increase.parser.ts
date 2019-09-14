import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {FFBE_MONSTER_TYPES} from '../../../ffbe.constants';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

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

    return text + ' si l\'unité est équipée d\'' + (this.isEquipmentCategoryFeminine(equipmentGumiId) ? 'une ' : 'un ')
      + this.getEquipmentCategoryTypeWithLink(equipmentGumiId);
  }
}
