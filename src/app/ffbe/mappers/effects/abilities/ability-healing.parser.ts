import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityHealingParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5
      || effect[3][0] !== 0 || effect[3][1] !== 0 || effect[3][4] !== 100) {
      return 'Effet AbilityHealingParser inconnu: Mauvaise liste de paramètres';
    }

    const base = effect[3][2];
    const mod = effect[3][3];
    const modText = mod > 0 ? '+ ' + mod / 200 + 'x la PSY + ' + (mod / 1000) + 'x la MAG du lanceur ' : '';
    const target = this.getTargetForHealingSkill(effect[0], effect[1]);
    const regenType = effect[2] === 30 ? ' PM ' : ' PV ';
    return 'Soigne ' + base + regenType + modText + target;
  }
}
