import {LimitBurstStrings} from './limit-burst-strings.model';

export class LimitBurst {
  constructor(public name: string,
              public attack_count: Array<number>,
              public attack_frames: Array<Array<number>>,
              public strings: LimitBurstStrings) {
  }
}
