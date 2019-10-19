import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {element} from 'protractor';

export class AbilityElementImbueParser extends EffectParser {
  private numCallsToWordEffectForIdenticalValues = 0;

  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 9) {
      return 'Effet AbilityElementImbueParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = [
      {name: 'Feu', value: effect[3][0]},
      {name: 'Glace', value: effect[3][1]},
      {name: 'Foudre', value: effect[3][2]},
      {name: 'Eau', value: effect[3][3]},
      {name: 'Vent', value: effect[3][4]},
      {name: 'Terre', value: effect[3][5]},
      {name: 'Lumière', value: effect[3][6]},
      {name: 'Ténèbres', value: effect[3][7]},
    ];

    const target = this.getTarget(effect[0], effect[1], 'TargetWithPreposition.De');

    const turns = ` pour ${effect[3][8]} tour`;

    const pluralForm = (effect[3][8] > 1) ? 's' : '';

    const sentence = this.wordEffectJoiningIdenticalValues(elements);

    if (this.numCallsToWordEffectForIdenticalValues === 0) {
      return 'Effet AbilityElementImbueParser inconnu: Pas d\'élément';
    } else if (this.numCallsToWordEffectForIdenticalValues > 1) {
      return 'Effet AbilityElementImbueParser inconnu: Plusieurs valeurs différentes';
    }

    return `${sentence} ${target}${turns}${pluralForm}`;
  }

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    ++this.numCallsToWordEffectForIdenticalValues;

    let sentence = '';

    if (currentValue === 100) {
      sentence += 'Ajoute ';
    } else {
      sentence += currentValue + '% de chance d\'ajouter ';
    }

    if (accumulatedStats.length === 1) {
      sentence += 'l\'élément ';
    } else {
      sentence += 'les éléments ';
    }

    sentence += accumulatedStats.join('/');

    sentence += ' aux attaques physiques et hybrides';

    return sentence;
  }
}
