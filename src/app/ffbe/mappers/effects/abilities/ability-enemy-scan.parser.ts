import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityEnemyScanParser extends EffectParser {
  parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1 || effect[3][0] !== 134) {
      return 'Effet AbilityEnemyScanParser inconnu: Mauvaise liste de paramètres';
    }

    const target = this.getTarget(effect[0], effect[1], 'TargetWithPreposition.None');

    return `Permet d'obtenir des infos sur ${target}`;
  }
}
