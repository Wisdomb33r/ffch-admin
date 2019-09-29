import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveEvasionMagicalParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet PassiveEvasionMagicalParser inconnu: Mauvaise liste de paramètres';
    }

    const noCumulativeText: string = effect[3][0] === -1 ? ' (effet passif non cumulable)' : ' (UNKNOWN parameter)';

    return '+' + effect[3][1] + '% d\'esquive magique' + noCumulativeText;
  }
}
