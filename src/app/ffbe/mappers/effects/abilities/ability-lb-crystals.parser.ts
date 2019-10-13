import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityLbCrystalsParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2 || effect[3][1] < effect[3][0]) {
      return 'Effet AbilityLbCrystalsParser inconnu: Mauvaise liste de paramètres';
    }

    const numMin = effect[3][0] / 100;
    const numMax = effect[3][1] / 100;

    const gain: string = numMin === numMax ? numMin.toString() : numMin.toString() + ' à ' + numMax.toString();
    const pluralForm = numMax === 1 ? ' cristal de limite' : ' cristaux de limite';
    const target = this.getLocalTarget(effect);

    return '+' + gain + pluralForm + target;
  }

  private getLocalTarget(effect: Array<any>): string {
    let target = ' à UNKNOWN';

    if (effect[0] === 0 && effect[1] === 3) {
      target = ' au lanceur';
    } else if (effect[0] === 1 && effect[1] === 2) {
      target = ' à un allié';
    }
    else if (effect[0] === 2 && effect[1] === 2) {
      target = ' aux alliés';
    }
    else if (effect[0] === 2 && effect[1] === 5) {
      target = ' aux alliés sauf le lanceur';
    }

    return target;
  }
}

