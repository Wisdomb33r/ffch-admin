import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';
import {SkillMapper} from '../../skill-mapper';

export class PassiveCounterAttackWithSkillParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 4) {
      return 'Effet PassiveCounterAttackWithSkillParser inconnu: Mauvaise liste de paramètres';
    }

    const counterChance = effect[3][0];
    const targets = effect[3][1]; // TODO how to integrate this into the description of the activated skill ? -_-
    const activatedSkillId = effect[3][2];
    const maxActivationNumber = effect[3][3];
    const damageTypeText = effect[2] === 49 ? 'physiques' : 'magiques';

    const activatedSkill: Skill = SkillsService.getInstance().searchForSkillByGumiId(activatedSkillId);

    return counterChance + '% de chance de contre-attaquer les dégâts ' + damageTypeText + ' par : '
      + (!activatedSkill ? 'UNKNOWN skill' : SkillMapper.toCompetence(activatedSkill).effet_fr)
      + ' (max ' + maxActivationNumber + ' par tour)';
  }
}
