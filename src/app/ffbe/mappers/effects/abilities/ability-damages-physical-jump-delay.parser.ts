import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityDamagesPhysicalJumpDelayParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length !== 5 || effect[0] !== 1 || effect[1] !== 1
      || effect[3][0] !== 0 || effect[3][1] !== 0) {
      return 'Effet AbilityDamagesPhysicalJumpDelayParser inconnu: Mauvaise liste de paramètres';
    }

    const elements = this.getElementsFromElementInflict(skill);
    const attackType = this.getAttackAndDamageWordingForPhysicalDamages(skill.attack_type);
    skill.physique = true;
    const power = effect[3][4];
    const turnDelay1 = effect[3][2];
    const turnDelay2 = effect[3][3];
    const turnDelayText = turnDelay1 === turnDelay2 ? turnDelay1 : 'UNKNOWN';
    const pluralForm = turnDelay1 > 1 ? 's' : '';
    const target = this.getTarget(effect[0], effect[1]);
    const activation = effect[2] === 134 ? 'manuelle' : 'automatique';
    return `${attackType}${elements} sautés à activation ${activation} de puissance ${power}% avec délai de ${turnDelayText} tour${pluralForm} ${target}`;
  }
}
