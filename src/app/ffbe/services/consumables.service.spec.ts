import {Consumable} from '../model/items/consumable/consumable.model';

export class ConsumablesServiceMock {
  private static INSTANCE: ConsumablesServiceMock = new ConsumablesServiceMock();

  public static getInstance() {
    return ConsumablesServiceMock.INSTANCE;
  }

  public searchForConsumableByGumiId(gumiId: number): Consumable {
    return null;
  }
}
