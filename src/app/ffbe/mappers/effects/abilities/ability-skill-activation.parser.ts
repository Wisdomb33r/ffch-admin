import {EffectParser} from '../effect-parser';
import {Skill} from '../../../model/skill.model';
import {SkillsService} from '../../../services/skills.service';

export class AbilitySkillActivationParser extends EffectParser {
  public parse(effect: Array<any>, skill: Skill): string {
    if (effect.length < 4 || !Array.isArray(effect[3]) || effect[3].length < 4) {
      return 'Effet AbilitySkillActivationParser inconnu: Mauvaise liste de paramètres';
    }

    const content = effect[3];
    const isTargetSelf = this.isTargetSelf(effect);
    const target = this.getTarget(effect[0], effect[1]);

    const numUses = this.getNumUses(content);
    const numTurns = this.getNumTurns(content, isTargetSelf, skill.isActivatedByPassiveSkill);
    const activatedSkillsIds: Array<number> = !Array.isArray(effect[3][1]) ? [effect[3][1]] : effect[3][1];

    const activatedSkills = activatedSkillsIds.map((skillId: number) => SkillsService.getInstance().searchForSkillByGumiId(skillId));
    const links = EffectParser.getSkillsNamesWithGumiIdentifierLinks(activatedSkills);

    let duration = '';

    if (this.hasUseLimit(content)) {
      if (this.hasTurnLimit(content)) {
        duration = ` pour ${numUses} sur ${numTurns}`;
      } else {
        duration = ` pour ${numUses}`;
      }
    } else {
      if (this.hasTurnLimit(content)) {
        duration = ` pour ${numTurns}`;
      }
    }

    return `Donne accès à ${links} ${target}${duration}`;
  }

  private hasTurnLimit(content: Array<any>): boolean {
    return content[3] > 0 && content[3] < 990;
  }

  private hasUseLimit(content: Array<any>): boolean {
    return content[2] > 0 && content[2] < 990;
  }

  private isTargetSelf(effect: Array<any>): boolean {
    return effect[1] === 3;
  }

  private getNumTurns(content: Array<any>, isTargetSelf: boolean, isActivatedByPassiveSkill: boolean): string {
    const numTurns = isTargetSelf && !isActivatedByPassiveSkill ? content[3] - 1 : content[3];
    const pluralForm = numTurns > 1 ? 's' : '';
    return `${numTurns} tour${pluralForm}`;
  }

  private getNumUses(content: Array<any>): string {
    const numTimes = content[2];
    const pluralForm = numTimes > 1 ? 's' : '';
    return `${numTimes} utilisation${pluralForm}`;
  }

}

