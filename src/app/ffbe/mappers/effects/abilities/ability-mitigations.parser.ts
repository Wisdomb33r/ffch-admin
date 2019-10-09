import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';

export class AbilityMitigationsParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3) {
      return 'Effet AbilityMitigationsParser inconnu: Mauvaise liste de paramètres';
    }

    const value = effect[3][0];
    const mitigationType = this.getMitigationType(effect[2]);
    const target = this.getTargetForHealingSkill(effect[0], effect[1]);
    const turns = ' pour ' + effect[3][1] + ' tour';
    const pluralForm = (effect[3][1] > 1) ? 's' : '';

    return '+' + value + '% de mitigation ' + mitigationType + target + turns + pluralForm;
  }

  private getMitigationType(id: number): string {
    let type = 'UNKNOWN ';

    if (id === 18) {
      type = 'physique ';
    } else if (id === 19) {
      type = 'magique ';
    } else if (id === 101) {
      type = 'générale ';
    }

    return type;
  }

}
