import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';
import {SkillMapper} from '../../skill-mapper';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';
import {FfbeUtils} from '../../../utils/ffbe-utils';

export class PassiveCounterAttackWithSkillParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 3) {
      return 'Effet PassiveCounterAttackWithSkillParser inconnu: Mauvaise liste de paramètres';
    }

    const counterChance = effect[3][0];
    // TODO how to integrate effect[3][1], which represents the target, into the description of the activated skill ? -_-
    const activatedSkillId = effect[3][2];
    const maxActivationNumber = effect[3][3];
    const damageTypeText = effect[2] === 49 ? 'physiques' : 'magiques';
    const prefixText = `${counterChance}% de chance de contrer les dégâts ${damageTypeText} par: `;
    let suffixText = '';
    if (maxActivationNumber) {
      suffixText = ` (max ${maxActivationNumber} par tour)`;
    }
    const activatedSkill: Skill = SkillsService.getInstance().searchForSkillByGumiId(activatedSkillId);
    if (!activatedSkill) {
      return `${prefixText} UNKNOWN skill ${suffixText}`;
    }

    activatedSkill.isActivatedByPassiveSkill = true;
    const activatedCompetence = SkillMapper.toCompetence(activatedSkill);

    if (!FfbeUtils.isNullOrUndefined(activatedCompetence.hits) && activatedCompetence.hits >= 5) {
      return `${prefixText}${this.getSkillNameWithGumiIdentifierLink(activatedSkill)}${suffixText}`;
    } else {
      return activatedCompetence.effet_fr
        .split(HTML_LINE_RETURN)
        .map(effet => `${prefixText}${effet}${suffixText}`)
        .join(HTML_LINE_RETURN);
    }
  }
}
