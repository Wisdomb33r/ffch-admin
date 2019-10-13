import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityStopInflictionParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilityStopInflictionParser inconnu: Mauvaise liste de paramètres';
    }

    const target = this.getLocalTarget(effect[0], effect[1]);

    const chances = effect[3][0];
    const numTurns = effect[3][1];

    const pluralForm = effect[3][1] > 1 ? 's' : '';

    return 'Inflige Stop (' + chances + '%)' + target + ' pour ' + numTurns + ' tour' + pluralForm;
  }

  private getLocalTarget(effectId1: number, effectId2: number) {
    let target = ' à UNKNOWN';

    if (effectId1 === 1 && effectId2 === 1) {
      target = ' à un adversaire';
    } else if (effectId1 === 2 && effectId2 === 1) {
      target = ' aux adversaires';
    }

    return target;
  }
}
