import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {FfbeUtils} from '../../../utils/ffbe-utils';

export class AbilityAilmentsCureParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 8) {
      return 'Effet AbilityAilmentsCureParser inconnu: Mauvaise liste de paramètres';
    }

    const target = this.getTargetForHealingSkill(effect[0], effect[1]);
    const cures: Array<string> = [];
    for (let i = 0; i < 8; i++) {
      const ailmentId = effect[3][i];
      if (ailmentId > 0) {
        cures.push(this.getAilmentFromId(ailmentId));
      }
    }
    let curesText = '';
    if (cures.length === 0) {
      curesText = 'UNKNOWN ailments';
    } else if (cures.length === 8) {
      curesText = 'toutes les altérations';
    } else {
      curesText = FfbeUtils.replaceLastOccurenceInString(cures.join(', '), ', ', ' et ');
    }

    return 'Soigne ' + curesText + ' ' + target;
  }
}
