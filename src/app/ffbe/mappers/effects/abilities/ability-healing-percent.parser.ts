import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityHealingPercentParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilityHealingPercentParser inconnu: Mauvaise liste de paramètres';
    }

    const target = this.getTargetForHealingSkill(effect[0], effect[1]);
    if (effect[2] === 26) {
      const percent1 = effect[3][0];
      const percent2 = effect[3][1];
      return 'Soigne ' + (percent1 === percent2 ? percent1 : 'UNKNOWN ') + '% PV ' + target;
    }

    const hp = effect[3][0];
    const mp = effect[3][1];
    let hpText = (hp > 0 ? hp + '% PV ' : '');
    const mpText = (mp > 0 ? mp + '% PM ' : '');
    if (hpText && mpText) {
      hpText += 'et ';
    }
    if (!hpText.length && !mpText.length) {
      hpText += 'UNKNOWN soins ';
    }
    return 'Soigne ' + hpText + mpText + target;
  }
}
