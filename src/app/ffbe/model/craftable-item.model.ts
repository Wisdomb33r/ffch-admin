import {Item} from './item.model';
import {Equipment} from './equipment.model';
import {Materia} from './materia.model';

export enum CraftableItemCategory {
  Item = 20,
  Equipment = 21,
  Materia = 22,
  Unknown = -1,
}

export class CraftableItem {
  public constructor(
    category: CraftableItemCategory,
    item: Item,
    equipment: Equipment,
    materia: Materia,
  ) {
  }
}
