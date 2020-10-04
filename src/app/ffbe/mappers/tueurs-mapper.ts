import {Tueurs} from '../model/tueurs.model';

export class TueursMapper {
  public static toDataBaseRepresentation(tueurs: Tueurs): string {
    return '';
  }

  public static fromDataBaseRepresentation(dbEntry: string): Tueurs {
    return new Tueurs();
  }
}
