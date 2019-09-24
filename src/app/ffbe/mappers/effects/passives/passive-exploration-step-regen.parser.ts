import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveExplorationStepRegenParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5) {
      return 'Effet PassiveExplorationStepRegenParser inconnu: Mauvaise liste de paramètres';
    }

    const hpRegen = effect[3][1];
    const mpRegen = effect[3][3];
    const steps = effect[3][4];

    return (hpRegen > 0 ? '+' + hpRegen + ' PV' : '') + (hpRegen > 0 && mpRegen > 0 ? ' et ' : '')
      + (mpRegen > 0 ? '+' + mpRegen + ' PM' : '') + ' tous les ' + steps + ' pas en exploration';
  }
}
