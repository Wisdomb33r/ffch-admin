import {Enhancement} from './enhancement.model';

export class BaseActivatedEnhancementsContainer {
  constructor(
    public baseEnhancements: Array<Enhancement>,
    public activatedEnhancements: Array<Enhancement> = null
  ) {
  }
}
