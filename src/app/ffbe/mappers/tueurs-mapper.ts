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
    if (FfbeUtils.isNullOrUndefined(dbEntry)) {
      return new Tueurs();
    }
    const values = dbEntry.split(',');

    if (!Array.isArray(values) || values.length !== FFBE_MONSTER_TYPES.length) {
      return new Tueurs();
    }
    console.log(values);
    return new Tueurs();
  }

}

/*

1  aquatic      50,0,0,0,0,0,0,0,0,0,0,0
2  beast        0,50,0,0,0,0,0,0,0,0,0,0
3  bird         0,0,50,0,0,0,0,0,0,0,0,0
4  demon        0,0,0,50,0,0,0,0,0,0,0,0
5  dragon       0,0,0,0,50,0,0,0,0,0,0,0
6  fairy        0,0,0,0,0,50,0,0,0,0,0,0
7  human        0,0,0,0,0,0,50,0,0,0,0,0
8  insect       0,0,0,0,0,0,0,50,0,0,0,0
9  machine      0,0,0,0,0,0,0,0,50,0,0,0
10 plant        0,0,0,0,0,0,0,0,0,50,0,0
11 stone        0,0,0,0,0,0,0,0,0,0,50,0
12 undead       0,0,0,0,0,0,0,0,0,0,0,50

 */

/*

  new MonsterType(1, 'bête', 'bêtes'),
  new MonsterType(2, 'oiseau', 'oiseaux'),
  new MonsterType(3, 'aquatique', 'aquatiques'),
  new MonsterType(4, 'démon', 'démons'),
  new MonsterType(5, 'humain', 'humains'),
  new MonsterType(6, 'machine', 'machines'),
  new MonsterType(7, 'dragon', 'dragons'),
  new MonsterType(8, 'esprit', 'esprits'),
  new MonsterType(9, 'insecte', 'insectes'),
  new MonsterType(10, 'pierre', 'pierres'),
  new MonsterType(11, 'plante', 'plantes'),
  new MonsterType(12, 'mort-vivant', 'morts-vivants'),
 */
