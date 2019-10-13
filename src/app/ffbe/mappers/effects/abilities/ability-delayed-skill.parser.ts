import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';

export class AbilityDelayedSkillParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3) {
      return 'Effet AbilityDelayedSkillParser inconnu: Mauvaise liste de paramètres';
    }

    const activatedSkillId = effect[3][0];

    const activatedSkill = SkillsService.getInstance().searchForSkillByGumiId(activatedSkillId);
    const activatedSkillLink = this.getSkillNameWithGumiIdentifierLink(activatedSkill);

    const numTurns = effect[3][2];
    const pluralForm = (effect[3][2] > 1) ? 's' : '';

    const target = this.getLocalTarget(effect[0], effect[1]);

    return 'Lance ' + activatedSkillLink + ' avec délai de ' + numTurns + ' tour' + pluralForm + target;
  }

  private getLocalTarget(effectId1: number, effectId2: number): string {
    let target = ' à UNKNOWN';

    if (effectId1 === 0 && effectId2 === 3) {
      target = ' au lanceur'
    } else if (effectId1 === 1 && effectId2 === 2) {
      target = ' à un allié'
    } else if (effectId1 === 2 && effectId2 === 2) {
      target = ' aux alliés'
    } else if (effectId1 === 1 && effectId2 === 1) {
      target = ' à un adversaire'
    } else if (effectId1 === 2 && effectId2 === 1) {
      target = ' aux adversaires'
    }

    return target;
  }
}
