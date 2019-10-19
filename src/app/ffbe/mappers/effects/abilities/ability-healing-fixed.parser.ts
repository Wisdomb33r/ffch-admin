import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityHealingFixedParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 1) {
      return 'Effet AbilityHealingFixedParser inconnu: Mauvaise liste de paramètres';
    }

    const target = this.getTarget(effect[0], effect[1]);
    if (effect[2] === 16 || effect[2] === 17) {
      const regen = effect[3][0];
      return 'Soigne ' + regen + (effect[2] === 16 ? ' PV ' : ' PM ') + target;
    }

    if (effect[2] === 65) {
      const hp = effect[3][0];
      const mp = effect[3][1];
      let hpText = (hp > 0 ? hp + ' PV ' : '');
      const mpText = (mp > 0 ? mp + ' PM ' : '');
      if (hpText && mpText) {
        hpText += 'et ';
      }
      if (!hpText.length && !mpText.length) {
        hpText += 'UNKNOWN soins ';
      }
      return 'Soigne ' + hpText + mpText + target;
    }
  }
}
