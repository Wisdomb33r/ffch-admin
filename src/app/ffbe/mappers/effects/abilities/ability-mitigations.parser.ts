import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityMitigationsParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3) {
      return 'Effet AbilityMitigationsParser inconnu: Mauvaise liste de paramètres';
    }

    const value = effect[3][0];

    const mitigationType = this.getMitigationType(effect[2]);

    const target = this.getTarget(effect[0], effect[1]);

    const turns = ' pour ' + effect[3][1] + ' tour';

    const pluralForm = (effect[3][1] > 1) ? 's' : '';

    return '+' + value + '% de mitigation ' + mitigationType + target + turns + pluralForm;
  }

  private getMitigationType(id: number): string {
    let type = 'UNKNOWN';

    if (id === 18) {
      type = 'physique';
    } else if (id === 19) {
      type = 'magique';
    } else if (id === 101) {
      type = 'générale';
    }

    return type;
  }

  private getTarget(effectId1: number, effectId2: number): string {
    let target = ' à UNKNOWN';

    if ((effectId1 === 0 || effectId1 === 1) && effectId2 === 3) {
      target = ' au lanceur';
    } else if (effectId1 === 1 && effectId2 === 2) {
      target = ' à un allié';
    } else if (effectId1 === 1 && effectId2 === 5) {
      target = ' à un allié sauf le lanceur';
    } else if (effectId1 === 3 && effectId2 === 2) {
      target = ' à un allié au hasard';
    } else if (effectId1 === 2 && effectId2 === 2) {
      target = ' aux alliés';
    } else if (effectId1 === 2 && effectId2 === 5) {
      target = ' aux alliés sauf le lanceur';
    }

    return target;
  }

}
