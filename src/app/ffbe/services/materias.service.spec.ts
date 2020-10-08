import {Materia} from '../model/items/materia/materia.model';

export class MateriasServiceMock {
  private static INSTANCE: MateriasServiceMock = new MateriasServiceMock();

  public static getInstance() {
    return MateriasServiceMock.INSTANCE;
  }

  public searchForMateriaByGumiId(gumiId: number): Materia {
    return null;
  }
}
