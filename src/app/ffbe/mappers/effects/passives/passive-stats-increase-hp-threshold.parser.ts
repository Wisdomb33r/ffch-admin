import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveStatsIncreaseHpThresholdParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 6) {
      return 'Effet PassiveStatsIncreaseHpThresholdParser inconnu: Mauvaise liste de paramètres';
    }

    const stat = this.getStatNameFromId(effect[3][0]);
    const turns = effect[3][5] > 0 ? ' pour ' + effect[3][5] + ' tours' : '';
    return '+' + effect[3][1] + '% ' + stat + turns + ' quand les PV passent sous ' + effect[3][3] + '% (max ' + effect[3][2] + ' fois)';
  }
}
