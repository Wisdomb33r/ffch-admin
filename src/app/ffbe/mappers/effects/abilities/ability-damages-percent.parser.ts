import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesPercentParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3 || effect[3][2] !== 100) {
      return 'Effet AbilityDamagesPercentParser inconnu: Mauvaise liste de paramètres';
    }

    const hpDmg1 = effect[3][0];
    const hpDmg2 = effect[3][1];
    const target = this.getTargetForDamagingSkill(effect[0], effect[1]);
    return 'Retire ' + (hpDmg1 === hpDmg2 ? hpDmg1 : 'UNKNOWN') + '% des PV ' + target;
  }
}
