import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityCharmInflictionParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilityCharmInflictionParser inconnu: Mauvaise liste de paramètres';
    }

    const target = this.getTarget(effect[0], effect[1]);

    const numTurns = effect[3][0];
    const chances = effect[3][1];

    const pluralForm = effect[3][0] > 1 ? 's' : '';

    return 'Inflige Charme (' + chances + '%)' + target + ' pour ' + numTurns + ' tour' + pluralForm;
  }

  private getTarget(effectId1: number, effectId2: number) {
    let target = ' à UNKNOWN';

    if (effectId1 === 0 && effectId2 === 3) {
      target = ' au lanceur';
    } else if (effectId1 === 2 && effectId2 === 5) {
      target = ' aux alliés sauf le lanceur';
    } else if (effectId1 === 1 && effectId2 === 1) {
      target = ' à un adversaire';
    } else if (effectId1 === 2 && effectId2 === 1) {
      target = ' aux adversaires';
    }

    return target;
  }
}
