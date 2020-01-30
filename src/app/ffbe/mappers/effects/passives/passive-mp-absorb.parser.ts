import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveMpAbsorbParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassivePmAbsorbParser inconnu: Mauvaise liste de paramètres';
    }

    const absorb = effect[3][0];
    return `Absorbe ${absorb}% des PM utilisés par l'adversaire lors de dégâts magiques encaissés`;
  }
}
