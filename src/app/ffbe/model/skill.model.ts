import {SkillStrings} from './skill-strings.model';

export class Skill {
  constructor(public name: string,
              public type: string,
              public magic_type: string,
              public mp_cost: number,
              public attack_count: Array<number>,
              public attack_frames: Array<Array<number>>,
              public strings: SkillStrings) {
  }
}
