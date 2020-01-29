import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityHealingPercentParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 2) {
      return 'Effet AbilityHealingPercentParser inconnu: Mauvaise liste de paramètres';
    }

    const target = this.getTarget(effect[0], effect[1]);
    if (effect[2] === 26) {
      const percent1 = effect[3][0];
      const percent2 = effect[3][1];
      const percentText = percent1 === percent2 ? percent1 : 'UNKNOWN ';
      return `Soigne ${percentText}% PV ${target}`;
    }

    const hp = effect[3][0];
    const mp = effect[3][1];
    let hpText = (hp > 0 ? `${hp}% PV ` : '');
    const mpText = (mp > 0 ? `${mp}% PM ` : '');
    if (hpText && mpText) {
      hpText += 'et ';
    }
    if (!hpText.length && !mpText.length) {
      hpText += 'UNKNOWN soins ';
    }
    let suffix = '';
    if (effect[2] === 11) {
      suffix = ' en sacrifiant le lanceur';
    }
    return `Soigne ${hpText}${mpText}${target}${suffix}`;
  }
}
