import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {TargetPrepositionEnum} from '../../../model/effects/target-preposition.enum';

export class AbilityCoversParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 9) {
      return 'Effet AbilityCoversParser inconnu: Mauvaise liste de paramètres';
    }

    const damageType = this.getDamageType(effect[3][8]);

    const numTurns = effect[3][6];
    const pluralForm = numTurns > 1 ? 's' : '';
    const turns = ` pour ${numTurns} tour${pluralForm}`;

    const target = this.getTarget(effect[0], effect[1], TargetPrepositionEnum.None);

    const chances = effect[3][4];

    const mitigationMin = effect[3][2];
    const mitigationMax = effect[3][3];

    const mitigation = mitigationMin + (mitigationMax > mitigationMin ? '% à ' + mitigationMax + '%' : '%');

    return `${chances}% de chance pour ${target} de protéger les alliés des dégâts ${damageType} avec mitigation de ${mitigation} des dégâts reçus${turns}`;
  }

  private getDamageType(typeId: number) {
    let damageType = 'UNKNOWN';

    if (typeId === 1) {
      damageType = 'physiques';
    } else if (typeId === 2) {
      damageType = 'magiques';
    }

    return damageType;
  }

}
