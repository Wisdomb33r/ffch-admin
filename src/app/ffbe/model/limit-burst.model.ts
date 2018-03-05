import {LimitBurstStrings} from './limit-burst-strings.model';
import {LimitBurstEffects} from './limit-burst-effects.model';

export class LimitBurst {
  constructor(public name: string,
              public attack_count: Array<number>,
              public attack_frames: Array<Array<number>>,
              public attack_damage: Array<Array<number>>,
              public min_level: LimitBurstEffects,
              public max_level: LimitBurstEffects,
              public strings: LimitBurstStrings,
              public levels: number) {
  }
}
