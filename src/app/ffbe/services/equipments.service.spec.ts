import {Equipment} from '../model/items/equipment/equipment.model';

export class EquipmentsServiceMock {
  private static INSTANCE: EquipmentsServiceMock = new EquipmentsServiceMock();

  public static getInstance() {
    return EquipmentsServiceMock.INSTANCE;
  }

  public searchForEquipmentByGumiId(gumiId: number): Equipment {
    return null;
  }
}
