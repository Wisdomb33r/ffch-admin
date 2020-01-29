import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class PassiveStatsIncreaseHpThresholdParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 6) {
      return 'Effet PassiveStatsIncreaseHpThresholdParser inconnu: Mauvaise liste de paramètres';
    }

    const stat = effect[2] === 10006 ? this.getStatsListFromIds(effect[3][0]) : this.getStatNameFromId(effect[3][0]);
    const turns = effect[3][5] > 0 ? ` pour ${effect[3][5]} tours` : '';
    return `+${effect[3][1]}% ${stat}${turns} quand les PV passent sous ${effect[3][3]}% (max ${effect[3][2]} fois)`;
  }

  private getStatsListFromIds(effectIds: Array<number>): string {
    if (!Array.isArray(effectIds)) {
      return 'UNKNOWN stats list';
    }
    if (effectIds.length === 8 && [23, 24, 25, 26, 27, 28, 29, 30].every(id => effectIds.indexOf(id) > -1)) {
      return 'aux résistances';
    }
    return effectIds.map((statId: number) => this.getStatNameFromId(statId)).join(', ');
  }
}
