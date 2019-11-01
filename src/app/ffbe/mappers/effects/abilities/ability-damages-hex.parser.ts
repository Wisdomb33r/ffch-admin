import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesHexParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 5 || !Array.isArray(effect[3][4])) {
      return 'Effet AbilityDamagesHexParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    const attackType = this.getAttackAndDamageWordingForFixedDamages(skill.attack_type);
    skill.fixe = true;
    const power = Math.round(effect[3][3]);
    const target = this.getTarget(effect[0], effect[1]);

    const numTurns = effect[3][1];
    const pluralForm = numTurns > 1 ? 's' : '';

    return `${attackType}${elements} de ${power} PV par status négatif ${target} pour ${numTurns} tour${pluralForm}`;
  }
}
