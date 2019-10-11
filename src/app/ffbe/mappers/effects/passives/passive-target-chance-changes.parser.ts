import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveTargetChanceChangesParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveTargetChanceChangesParser inconnu: Mauvaise liste de paramètres';
    }

    const sign = (effect[2] === 24 ? '+' : '-');

    return `${sign}${effect[3][0]}% de chance d'être ciblé`;
  }
}
