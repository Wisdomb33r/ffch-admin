import {Skill} from '../../model/skill.model';

export abstract class EffectParser {
  public abstract parse(effect: Array<any>, skill: Skill): string;

  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return '';
  }

  protected wordEffectJoiningIdenticalValues(values: Array<{ name: string, value: number }>): string {
    values.sort((a, b) => {
      return a.value === b.value ? 0 : (a.value > b.value ? -1 : 1);
    });
    let text = '';
    let currentValue: number;
    let accumulatedStats = [];
    values.forEach(stat => {
      if (currentValue === stat.value) {
        accumulatedStats.push(stat.name);
      } else {
        if (currentValue && accumulatedStats) {
          text += (text.length ? ', ' : '') + this.wordEffectForIdenticalValues(currentValue, accumulatedStats);
          currentValue = undefined;
          accumulatedStats = [];
        }
        if (stat.value > 0) {
          currentValue = stat.value;
          accumulatedStats = [stat.name];
        }
      }
    });
    if (currentValue > 0) {
      text += (text.length ? ', ' : '') + this.wordEffectForIdenticalValues(currentValue, accumulatedStats);
    }
    return text;
  }
}
