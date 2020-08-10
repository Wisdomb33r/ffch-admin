export abstract class EffectIdenticalValuesWording {
  protected wordEffectForIdenticalValues(currentValue, accumulatedStats: Array<string>): string {
    return '';
  }

  protected wordEffectJoiningIdenticalValues(values: Array<{ name: string, value: number }>,
                                             groupSeparator = ', ', keepZeros = false): string {
    const decreasingSort = values.some(element => {
      return element.value > 0;
    });
    values.sort((a, b) => {
      return a.value === b.value ? 0 : (decreasingSort ? (a.value > b.value ? -1 : 1) : (a.value > b.value ? 1 : -1));
    });
    let text = '';
    let currentValue: number;
    let accumulatedStats = [];
    values.forEach(stat => {
      if (currentValue === stat.value) {
        accumulatedStats.push(stat.name);
      } else {
        if (currentValue && accumulatedStats) {
          text += (text.length ? groupSeparator : '') + this.wordEffectForIdenticalValues(currentValue, accumulatedStats);
          currentValue = undefined;
          accumulatedStats = [];
        }
        if (stat.value !== undefined && (stat.value !== 0 || keepZeros)) {
          currentValue = stat.value;
          accumulatedStats = [stat.name];
        }
      }
    });
    if (currentValue !== undefined && (currentValue !== 0 || keepZeros)) {
      text += (text.length ? groupSeparator : '') + this.wordEffectForIdenticalValues(currentValue, accumulatedStats);
    }
    return text;
  }
}
