import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveDualWieldDamageCapParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveDualWieldDamageCapParser inconnu: Mauvaise liste de paramètres';
    }

    return 'Augmente le coefficient multiplicateur maximal de la chaîne de combo à 600% lorsque l\'unité porte deux armes';
  }
}
