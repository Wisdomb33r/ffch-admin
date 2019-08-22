export class LimitBurst {
  constructor(public name: string,
              public attack_count: Array<number>,
              public attack_frames: Array<Array<number>>,
              public attack_damage: Array<Array<number>>,
              public min_level: Array<string>,
              public max_level: Array<string>,
              public levels: Array<any>,
              public names: Array<string>,
              public descriptions: Array<string>) {
  }
}
