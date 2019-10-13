import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityLbSpeedIncreaseParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilityLbSpeedIncreaseParser inconnu: Mauvaise liste de paramètres';
    }

    const speed: string = effect[3][0].toString();
    const numTurns = effect[3][1];
    const target = this.getLocalTarget(effect);
    const pluralForm = numTurns > 1 ? 's' : '';

    return '+' + speed + '% à la vitesse de la jauge de limite' + target + ' pour ' + numTurns + ' tour' + pluralForm;
  }

  private getLocalTarget(effect: Array<any>): string {
    let target = '';
    if ((effect[0] === 0 || effect[0] === 1) && effect[1] === 3) {
      target = ' du lanceur';
    } else if (effect[0] === 1 && effect[1] === 2) {
      target = ' d\'un allié';
    } else if (effect[0] === 2 && effect[1] === 2) {
      target = ' des alliés';
    } else if (effect[0] === 2 && effect[1] === 5) {
      target = ' des alliés sauf le lanceur';
    }

    return target;
  }
}

