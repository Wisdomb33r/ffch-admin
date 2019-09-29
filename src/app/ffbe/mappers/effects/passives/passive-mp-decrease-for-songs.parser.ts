import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveMpDecreaseForSongsParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet PassiveMpDecreaseForSongsParser inconnu: Mauvaise liste de paramètres';
    }

    return '-' + effect[3][0] + '% de PM consommés par les compétences chantées';
  }
}
