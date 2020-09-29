import {EffectParser} from '../../../mappers/effects/effect-parser';
import {Skill} from '../../skill.model';
import {FFBE_MONSTER_TYPES} from '../../../ffbe.constants';
import {HTML_LINE_RETURN} from '../../../mappers/effects/skill-effects.mapper';

export class PassiveKillerDamageIncreaseEffect extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3) {
      return 'Effet PassiveKillerDamageIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const monsterTypeGumiIds = Array.isArray(effect[3][0]) ? effect[3][0] : [effect[3][0]];
    const physicalDamageIncreases = Array.isArray(effect[3][1]) ? effect[3][1] : Array(monsterTypeGumiIds.length).fill(effect[3][1]);
    const magicalDamageIncreases = Array.isArray(effect[3][2]) ? effect[3][2] : Array(monsterTypeGumiIds.length).fill(effect[3][2]);

    const texts: Array<string> = [];
    monsterTypeGumiIds.forEach((monsterTypeGumiId, index) => {
      let text = '';
      const monsterType = FFBE_MONSTER_TYPES.find(type => type.gumiId === monsterTypeGumiId);
      const monsterTypeText = `contre les ${monsterType ? monsterType.pluralName : 'UNKNOWN'}`;
      const physicalDamageIncrease = physicalDamageIncreases.length > index ? physicalDamageIncreases[index] : 0;
      const magicalDamageIncrease = magicalDamageIncreases.length > index ? magicalDamageIncreases[index] : 0;

      if (physicalDamageIncrease > 0) {
        text += `+${physicalDamageIncrease}% de dégâts physiques `;
        if (magicalDamageIncrease > 0 && physicalDamageIncrease === magicalDamageIncrease) {
          text += 'et magiques ';
        }
        text += monsterTypeText;
      }
      if (magicalDamageIncrease > 0 && physicalDamageIncrease !== magicalDamageIncrease) {
        text += `${text.length ? HTML_LINE_RETURN : ''}+${magicalDamageIncrease}% de dégâts magiques ${monsterTypeText}`;
      }
      texts.push(text);
    });

    return texts.join(HTML_LINE_RETURN);
  }
}
