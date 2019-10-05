import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';
import {SkillMapper} from '../../skill-mapper';
import {HTML_LINE_RETURN} from '../skill-effects.mapper';

export class AbilitySkillSwitchParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 6) {
      return 'Effet AbilitySkillSwitchParser inconnu: Mauvaise liste de paramètres';
    }

    const baseSkillId = effect[3][5];
    const activatedSkillId = effect[3][3];
    const activatorSkillId: Array<number> = !Array.isArray(effect[3][1]) ? [effect[3][1]] : effect[3][1];

    const baseSkill = SkillsService.getInstance().searchForSkillByGumiId(baseSkillId);
    const baseSkillEffect = SkillMapper.toCompetence(baseSkill).effet_fr;

    const activatedSkill = SkillsService.getInstance().searchForSkillByGumiId(activatedSkillId);
    const activatedSkillLink = this.getSkillNameWithGumiIdentifierLink(activatedSkill);

    const activatorSkills = activatorSkillId.map((skillId: number) => SkillsService.getInstance().searchForSkillByGumiId(skillId));
    const activatorSkillsLinks = this.getSkillsNamesWithGumiIdentifierLinks(activatorSkills);

    this.fillSkillWithTransitiveActivatedSkillInformation(skill, baseSkill);

    return baseSkillEffect + HTML_LINE_RETURN + HTML_LINE_RETURN +
      'Se transforme en ' + activatedSkillLink + ' si utilisé après ' + activatorSkillsLinks;
  }

  private fillSkillWithTransitiveActivatedSkillInformation(skill: Skill, activatedSKill: Skill) {
    skill.attack_count = activatedSKill.attack_count;
    skill.attack_frames = activatedSKill.attack_frames;
    skill.attack_damage = activatedSKill.attack_damage;
    skill.attack_type = activatedSKill.attack_type;
    skill.type = activatedSKill.type;
    skill.rarity = activatedSKill.rarity;
    skill.active = activatedSKill.active;
    skill.magic_type = activatedSKill.magic_type;
    skill.cost = activatedSKill.cost;
    skill.element_inflict = activatedSKill.element_inflict;
    skill.effects_raw = activatedSKill.effects_raw;
  }
}
