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
    const pluralForm = numMax === 1 ? 'cristal de limite' : 'cristaux de limite';
    const target = this.getTarget(effect[0], effect[1]);

    return `+${gain} ${pluralForm} ${target}`;
  }
}

