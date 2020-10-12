import {Amelioration} from './amelioration.model';

export class BaseActivatedAmeliorationsContainer {
  constructor(
    public baseAmeliorations: Array<Amelioration>,
    public activatedAmeliorations: Array<Amelioration> = null
  ) {
  }
}
