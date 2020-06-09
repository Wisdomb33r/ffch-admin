import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {FfbeUtils} from '../../../utils/ffbe-utils';

export class PassiveAilmentsCureAfterBattleParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 8 || effect[3].reduce((a, b) => a + b, 0) < 1) {
      return 'Effet PassiveAilmentsCureAfterBattleParser inconnu: Mauvaise liste de paramètres';
    }

    const target = this.getTarget(effect[0], effect[1]);

    const cures = effect[3].map((value, index) => value === 1 ? this.getAilmentFromId(index + 1) : undefined)
      .filter(value => !FfbeUtils.isNullOrUndefined(value));

    let curesText = '';
    if (cures.length === 0) {
      curesText = 'UNKNOWN ailments';
    } else if (cures.length === 8) {
      curesText = 'toutes les altérations';
    } else {
      curesText = FfbeUtils.replaceLastOccurenceInString(cures.join(', '), ', ', ' et ');
    }

    return `Soigne ${curesText} ${target} après le combat`;
  }

//
}
