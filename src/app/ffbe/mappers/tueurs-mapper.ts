import {Tueurs} from '../model/tueurs.model';
import {FfbeUtils} from '../utils/ffbe-utils';
import {FFBE_MONSTER_TYPES} from '../ffbe.constants';

export class TueursMapper {
  public static toDataBaseRepresentation(tueurs: Tueurs): string {
    if (FfbeUtils.isNullOrUndefined(tueurs)) {
      return '';
    }

    const values = Array<number>(FFBE_MONSTER_TYPES.length).fill(0);

    if (TueursMapper.isValidValue(tueurs.aquatiques)) {
      values[0] = tueurs.aquatiques;
    }
    if (TueursMapper.isValidValue(tueurs.betes)) {
      values[1] = tueurs.betes;
    }
    if (TueursMapper.isValidValue(tueurs.oiseaux)) {
      values[2] = tueurs.oiseaux;
    }
    if (TueursMapper.isValidValue(tueurs.demons)) {
      values[3] = tueurs.demons;
    }
    if (TueursMapper.isValidValue(tueurs.dragons)) {
      values[4] = tueurs.dragons;
    }
    if (TueursMapper.isValidValue(tueurs.esprits)) {
      values[5] = tueurs.esprits;
    }
    if (TueursMapper.isValidValue(tueurs.humains)) {
      values[6] = tueurs.humains;
    }
    if (TueursMapper.isValidValue(tueurs.insectes)) {
      values[7] = tueurs.insectes;
    }
    if (TueursMapper.isValidValue(tueurs.machines)) {
      values[8] = tueurs.machines;
    }
    if (TueursMapper.isValidValue(tueurs.plantes)) {
      values[9] = tueurs.plantes;
    }
    if (TueursMapper.isValidValue(tueurs.pierres)) {
      values[10] = tueurs.pierres;
    }
    if (TueursMapper.isValidValue(tueurs.mortsVivants)) {
      values[11] = tueurs.mortsVivants;
    }

    if (values.every(value => FfbeUtils.isNullOrUndefined(value) || value === 0)) {
      return '';
    }

    return values.join(',');
  }

  private static isValidValue(value: number): boolean {
    return !FfbeUtils.isNullOrUndefined(value) && value !== 0;
  }

  public static fromDataBaseRepresentation(dbEntry: string): Tueurs {
    return new Tueurs();
  }

}
