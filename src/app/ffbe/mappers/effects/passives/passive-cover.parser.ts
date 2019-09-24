import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveCoverParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5 || effect[3][1] !== 100) {
      return 'Effet PassiveCoverParser inconnu: Mauvaise liste de paramètres';
    }

    const allyRestriction = effect[3][0];
    const dmgReductionMin = effect[3][2];
    const dmgReductionMax = effect[3][3];
    const procChance = effect[3][4];
    const dmgType = effect[2] === 8 ? ' physiques' : (effect[2] === 59 ? ' magiques' : ' UNKNOWN');

    let mitigation = '';
    if (dmgReductionMin > 0 && dmgReductionMax > 0) {
      mitigation = ' avec mitigation de ' + dmgReductionMin + '%';
      if (dmgReductionMin !== dmgReductionMax) {
        mitigation += '-' + dmgReductionMax + '%';
      }
    }

    return procChance + '% de chance de protéger un allié '
      + (allyRestriction === 1 ? 'féminin ' : '')
      + 'des attaques' + dmgType + mitigation;
  }
}
