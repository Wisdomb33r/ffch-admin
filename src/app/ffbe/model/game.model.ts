import {FfbeUtils} from '../utils/ffbe-utils';

export class Game {
  constructor(public gumiId: number,
              public ffchId: number,
              public name: string) {
  }

  public isUnknownGame(): boolean {
    return FfbeUtils.isNullOrUndefined(this.ffchId);
  }
}
