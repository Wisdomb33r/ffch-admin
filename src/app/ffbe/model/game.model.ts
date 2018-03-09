import {isNullOrUndefined} from 'util';

export class Game {
  constructor(public gumiId: number,
              public ffchId: number,
              public name: string) {
  }

  public isUnknownGame(): boolean {
    return isNullOrUndefined(this.ffchId);
  }
}
