import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityRaiseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet AbilityRaiseParser inconnu: Mauvaise liste de paramètres';
    }

    const hp = effect[3][0];
    let target = 'UNKNOWN target';
    if (effect[0] === 2) {
      target = 'les alliés';
    }
    if (effect[0] === 1) {
      target = 'un allié';
      if (effect[1] === 6) {
        target += ' ou inflige Mort à une cible mort-vivante';
      }
    }
    return 'Ranime avec ' + hp + '% de PV ' + target;
  }
}
