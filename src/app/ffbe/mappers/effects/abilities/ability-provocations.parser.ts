import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityProvocationsParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilityProvocationsParser inconnu: Mauvaise liste de paramètres';
    }

    const percentsProvocation = effect[3][0];
    const numTurns = effect[3][1];

    const pluralFormTurns = numTurns > 1 ? 's' : '';

    const target = this.getLocalTarget(effect[0], effect[1]);

    return '+' + percentsProvocation + '% de chances' + target
      + ' d\'être ciblé pour ' + numTurns + ' tour' + pluralFormTurns;
  }

  private getLocalTarget(effectId1: number, effectId2: number): string {
    let target = ' pour UNKNOWN';

    if ((effectId1 === 0 || effectId1 === 1) && effectId2 === 3) {
      target = ' pour le lanceur';
    } else if (effectId1 === 1 && effectId2 === 2) {
      target = ' pour un allié';
    }

    return target;
  }
}
