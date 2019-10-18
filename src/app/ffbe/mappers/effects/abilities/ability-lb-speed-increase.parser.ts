import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityLbSpeedIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilityLbSpeedIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const speed: string = effect[3][0].toString();
    const numTurns = effect[3][1];
    const target = this.getTarget(effect[0], effect[1], 'TargetWithPreposition.De');
    const pluralForm = numTurns > 1 ? 's' : '';

    return `+${speed}% à la vitesse de la jauge de limite ${target} pour ${numTurns} tour${pluralForm}`;
  }
}

