import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveMpRecoveryParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassivePmRecoveryParser inconnu: Mauvaise liste de paramètres';
    }

    // WTF is this ? Esper orb withing PM recovery ?
    if (effect[3].length > 1) {
      if (effect[3][0] === 3 && effect[3][1] === 3) {
        return '+3 sphères de chimère';
      } else {
        return 'Effet PassivePmRecoveryParser UNKNOWN';
      }
    }

    return '+' + effect[3][0] + '% de PM soignés chaque tour';
  }
}
