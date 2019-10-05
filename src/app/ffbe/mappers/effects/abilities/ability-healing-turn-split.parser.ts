import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityHealingTurnSplitParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 4 || effect[3][1] !== 1) {
      return 'Effet AbilityHealingParser inconnu: Mauvaise liste de paramètres';
    }

    const base = effect[3][2];
    const mod = effect[3][0];
    const turns = effect[3][3];
    const turnsText = turns === -1 ? ' chaque tour' : ' sur ' + turns + ' tours';
    const modText = this.getHealingText(mod);
    let target = this.getTargetForHealingSkill(effect[0], effect[1]);
    if (turns === -1) {
      target = 'au lanceur';
    }
    const regenType = effect[2] === 30 || effect[2] === 57 ? ' PM ' : ' PV ';
    const isSong = effect[2] === 56 || effect[2] === 57;
    return 'Soigne ' + base + regenType + modText + target + turnsText + (isSong ? ' en chantant' : '');
  }
}
